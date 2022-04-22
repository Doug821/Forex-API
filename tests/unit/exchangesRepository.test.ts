import ExchangesRepository from '../../src/app/repositories/ExchangesRepository';

interface Exchange {
  id: string;
  send: number;
  receive: number;
  operation: string;
  createdat: string;
}

describe('Exchanges repository tests', () => {
  it('should create an exchange on database', async () => {
    const exchange = { send: 10, receive: 20, operation: 'GBP_USD' };

    const row = await ExchangesRepository.create(exchange);

    const typeData = (data: Exchange) => typeof data.id === 'string'
      && typeof data.send === 'number'
      && typeof data.receive === 'number'
      && typeof data.operation === 'string'
      && typeof data.createdat === 'string';

    expect(typeData(row)).toBe(true);
  });

  it('should return the currency history', async () => {
    const exchangeHistory = await ExchangesRepository.currencyHistory(
      'GBP to USD',
      '2022-04-08',
    );
    expect(exchangeHistory).toBe(exchangeHistory);
  });

  it('should return the currency history', async () => {
    const exchangeHistory = await ExchangesRepository.currencyHistory(
      'USD to GBP',
      '2022-04-08',
    );
    expect(exchangeHistory).toBe(exchangeHistory);
  });

  it('should return an error on the currency history when using invalid credentials', async () => {
    const exchangeHistory = await ExchangesRepository.currencyHistory('', '');
    expect(exchangeHistory).toStrictEqual({ error: 'Invalid credentials' });
  });
});
