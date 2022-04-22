import 'dotenv/config';
import '../../src/queue';
import Queue from '../../src/app/lib/Queue';

describe('Queue jobs test', () => {
  it('should add and process an exchange in the queue', async () => {
    const exchange = { send: 10, receive: 20, operation: 'GBP_USD' };

    await Queue.add('ExchangeCreation', exchange);
  });
});
