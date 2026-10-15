const Parking = require('./parking.model');
const { NotFoundError } = require('../../utils/errors');
const { getPaginationOptions, formatPaginationMeta } = require('../../utils/pagination');
const { calculateDistanceKm } = require('../../utils/helpers');

class ParkingService {
  async listParkings(query) {
    const { page, limit, skip } = getPaginationOptions(query);
    const filter = { isActive: true };

    if (query.city) {
      filter.city = { $regex: new RegExp(`^${query.city}$`, 'i') };
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.vehicleType) {
      filter.vehicleTypes = query.vehicleType;
    }

    if (query.amenities) {
      const amenitiesList = Array.isArray(query.amenities) ? query.amenities : [query.amenities];
      filter.amenities = { $all: amenitiesList };
    }

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { landmark: { $regex: query.search, $options: 'i' } },
        { address: { $regex: query.search, $options: 'i' } }
      ];
    }

    const hasCoordinates = query.latitude !== undefined && query.longitude !== undefined;
    let parkings;
    let total;

    if (hasCoordinates) {
      const userLat = parseFloat(query.latitude);
      const userLng = parseFloat(query.longitude);
      const maxDistanceMeters = (query.maxDistanceKm || 10) * 1000;

      filter.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [userLng, userLat]
          },
          $maxDistance: maxDistanceMeters
        }
      };

      total = await Parking.countDocuments(filter);
      parkings = await Parking.find(filter).skip(skip).limit(limit);

      // Add distanceKm calculation for response
      parkings = parkings.map((doc) => {
        const item = doc.toObject();
        const [pLng, pLat] = item.location.coordinates;
        item.distanceKm = calculateDistanceKm(userLat, userLng, pLat, pLng);
        return item;
      });
    } else {
      let sort = { createdAt: -1 };
      if (query.sortBy === 'rating') sort = { rating: -1 };
      else if (query.sortBy === 'price_asc') sort = { 'pricingPerHour.car': 1 };
      else if (query.sortBy === 'price_desc') sort = { 'pricingPerHour.car': -1 };

      [parkings, total] = await Promise.all([
        Parking.find(filter).sort(sort).skip(skip).limit(limit),
        Parking.countDocuments(filter)
      ]);
    }

    return {
      parkings,
      pagination: formatPaginationMeta(total, page, limit)
    };
  }

  async getMapPins(query) {
    const filter = { isActive: true };
    if (query.city) {
      filter.city = { $regex: new RegExp(`^${query.city}$`, 'i') };
    }

    const parkings = await Parking.find(filter).select(
      'name location status pricingPerHour availableSlots rating totalReviews landmark image amenities'
    );

    return parkings;
  }

  async getParkingById(id, userCoords = null) {
    const parking = await Parking.findById(id);
    if (!parking || !parking.isActive) {
      throw new NotFoundError('Parking spot not found');
    }

    const response = parking.toObject();
    if (userCoords && userCoords.lat && userCoords.lng) {
      const [pLng, pLat] = response.location.coordinates;
      response.distanceKm = calculateDistanceKm(userCoords.lat, userCoords.lng, pLat, pLng);
    }

    return response;
  }

  async createParking(data, operatorId) {
    const { longitude, latitude, ...rest } = data;
    const newParking = await Parking.create({
      ...rest,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      operator: operatorId,
      availableSlots: rest.totalSlots
    });
    return newParking;
  }

  async updateParking(id, updateData) {
    if (updateData.longitude && updateData.latitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [updateData.longitude, updateData.latitude]
      };
      delete updateData.longitude;
      delete updateData.latitude;
    }

    const parking = await Parking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!parking) {
      throw new NotFoundError('Parking spot not found');
    }

    return parking;
  }

  async deleteParking(id) {
    const parking = await Parking.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!parking) {
      throw new NotFoundError('Parking spot not found');
    }
    return { message: 'Parking spot deleted successfully' };
  }
}

module.exports = new ParkingService();
