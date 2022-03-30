/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { v4 } from 'uuid';
import request from 'supertest';
import app from '../../src/index';

describe('Exchange controller tests', () => {
  it('should return a status code 200 when listing all exchanges', async () => {
    const response = await request(app).get('/exchanges');

    expect(response.statusCode).toBe(200);
  });

  it('should be able to create a new exchange', async () => {
    const response = await request(app).post('/exchanges').send({
      id: v4(),
      send: 1000,
      receive: 1000,
      operation: 'GBP-USD',
      date: new Date(),
    });

    expect(response.statusCode).toBe(200);
  });

  it('should not be able to create a new exchange if it has no data', async () => {
    const response = await request(app).post('/exchanges').send({});

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create a new exchange if the ammount is a negative number', async () => {
    const response = await request(app).post('/exchanges').send({
      id: v4(),
      send: 1,
      receive: -1,
      operation: 'GBP-USD',
      date: new Date(),
    });

    expect(response.statusCode).toBe(400);
  });

  it('should be able to delete an exchange', async () => {
    const response = await request(app).delete('/exchanges/1');

    expect(response.statusCode).toBe(204);
  });
});
