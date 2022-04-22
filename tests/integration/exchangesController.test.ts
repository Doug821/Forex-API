import request from 'supertest';
import app from '../../src/index';

interface Exchange {
  id: string;
  send: number;
  receive: number;
  operation: string;
  createdat: string;
}

describe('Exchange controller tests', () => {
  it('should return a status code 201 when listing all exchanges', async () => {
    const response = await request(app).get('/exchanges');
    expect(response.status).toBe(201);
  });

  it('should be sucessfull when listing all exchanges if the data type of the properties is correct', async () => {
    const response = await request(app).get('/exchanges');

    const typeData = (data: Exchange) => typeof data.id === 'string'
      && typeof data.send === 'number'
      && typeof data.receive === 'number'
      && typeof data.operation === 'string'
      && typeof data.createdat === 'string';

    expect(typeData(response.body[0])).toBe(true);
  });

  it('should be able to create a new exchange', async () => {
    const response = await request(app).post('/exchanges').send({
      amount: 1000,
      operation: 'GBP_USD',
    });

    expect(response.statusCode).toBe(201);
  });

  it('should not be able to create a new exchange if it has no data', async () => {
    const response = await request(app).post('/exchanges').send({});

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create a new exchange if the ammount is a negative number', async () => {
    const response = await request(app).post('/exchanges').send({
      amount: -1,
      operation: 'GBP-USD',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should be able to delete an exchange', async () => {
    const id = '8bc4c3a7-7fae-4538-af64-256e7e78edfe';
    const response = await request(app).delete(`/exchanges/${id}`);

    expect(response.statusCode).toBe(204);
  });
});
