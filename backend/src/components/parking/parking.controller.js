const parkingService = require('./parking.service');
const parkingPolicy = require('./parking.policy');
const ApiResponse = require('../../utils/response');

class ParkingController {
  async listParkings(req, res, next) {
    try {
      const { parkings, pagination } = await parkingService.listParkings(req.query);
      return ApiResponse.paginated(res, parkings, pagination, 'Parking spots retrieved');
    } catch (error) {
      next(error);
    }
  }

  async getMapPins(req, res, next) {
    try {
      const pins = await parkingService.getMapPins(req.query);
      return ApiResponse.success(res, pins, 'Map pins retrieved');
    } catch (error) {
      next(error);
    }
  }

  async getParkingById(req, res, next) {
    try {
      const userCoords = {
        lat: req.query.latitude ? parseFloat(req.query.latitude) : null,
        lng: req.query.longitude ? parseFloat(req.query.longitude) : null
      };
      const parking = await parkingService.getParkingById(req.params.id, userCoords);
      return ApiResponse.success(res, parking, 'Parking details retrieved');
    } catch (error) {
      next(error);
    }
  }

  async createParking(req, res, next) {
    try {
      parkingPolicy.canManageParking(req.user);
      const newParking = await parkingService.createParking(req.body, req.user.id);
      return ApiResponse.created(res, newParking, 'Parking spot created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateParking(req, res, next) {
    try {
      parkingPolicy.canManageParking(req.user);
      const updatedParking = await parkingService.updateParking(req.params.id, req.body);
      return ApiResponse.success(res, updatedParking, 'Parking spot updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteParking(req, res, next) {
    try {
      parkingPolicy.canManageParking(req.user);
      const result = await parkingService.deleteParking(req.params.id);
      return ApiResponse.success(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ParkingController();
