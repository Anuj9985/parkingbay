const request = require('supertest');
const app = require('../../src/app');

describe('API Health Check Integration Test', () => {
  it('GET /api/v1/health should return status OK', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});
