/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import ExchangesRepository from '../../src/app/repositories/ExchangesRepository';

describe('Exchanges repository tests', () => {
  it('should return an exchange if it exists', async () => {
    const exchange = await ExchangesRepository.findById('1');
    expect(exchange);
  });
});
