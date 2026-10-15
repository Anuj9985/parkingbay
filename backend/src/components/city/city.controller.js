const cityService = require('./city.service');
const cityPolicy = require('./city.policy');
const ApiResponse = require('../../utils/response');

class CityController {
  async getCityByName(req, res, next) {
    try {
      const city = await cityService.getCityByName(req.params.name);
      return ApiResponse.success(res, city, 'City details retrieved');
    } catch (error) {
      next(error);
    }
  }

  async listCities(req, res, next) {
    try {
      const cities = await cityService.listCities();
      return ApiResponse.success(res, cities, 'Cities list retrieved');
    } catch (error) {
      next(error);
    }
  }

  async createCity(req, res, next) {
    try {
      cityPolicy.canManageCity(req.user);
      const city = await cityService.createCity(req.body);
      return ApiResponse.created(res, city, 'City created successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CityController();
