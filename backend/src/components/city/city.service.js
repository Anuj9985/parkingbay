const City = require('./city.model');
const { NotFoundError } = require('../../utils/errors');

class CityService {
  async getCityByName(name = 'Kolhapur') {
    const city = await City.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      isActive: true
    });
    if (!city) {
      throw new NotFoundError(`City info for '${name}' not found`);
    }
    return city;
  }

  async listCities() {
    return await City.find({ isActive: true }).select('name tagline heroImage centerCoordinates');
  }

  async createCity(cityData) {
    return await City.create(cityData);
  }
}

module.exports = new CityService();
