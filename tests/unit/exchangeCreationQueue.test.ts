import ExchangeCreation from '../../src/app/jobs/ExchangeCreation';

describe('Queue jobs test', () => {
  it('should run the handle method from Exchange Creation Job', async () => {
    const data = { data: { send: 10, receive: 20, operation: 'GBP_USD' } };

    await ExchangeCreation.handle(data);
  });
});
