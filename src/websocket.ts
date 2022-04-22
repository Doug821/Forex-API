import { Server } from 'socket.io';
import Queue from './app/lib/Queue';
import ExchangesRepository from './app/repositories/ExchangesRepository';

export default function Socket(httpServer: any) {
  const io = new Server(httpServer, {
    path: '/socket.io',
    cors: {
      origin: ['http://localhost:3001', 'http://localhost:3000'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async (socket) => {
    // Send the converted currency
    socket.on('convert', async ({ amount, operation }) => {
      const receive = await ExchangesRepository.currencyConverter(
        amount,
        operation,
      );

      socket.emit('receive', receive);
    });

    // Send all the exchanges
    socket.on('sendExchanges', async (callbackExchanges) => {
      try {
        const exchangesList = async () => {
          const exchanges = await ExchangesRepository.findAll();
          return exchanges;
        };

        callbackExchanges(await exchangesList());
      } catch (error) {
        return { error: 'Could not list exchanges' };
      }
    });

    // Create and return a new exchange
    socket.on('exchange', async ({ amount, operation }) => {
      const receive: any = await ExchangesRepository.currencyConverter(
        amount,
        operation,
      );

      const exchange = {
        send: amount,
        receive: receive.exchange,
        operation,
      };

      Queue.add('ExchangeCreation', exchange);

      socket.emit('newEchange', exchange);
    });

    // Delete an exchange
    socket.on('delete', async (id: string) => {
      const receive: any = await ExchangesRepository.delete(id);
      console.log(receive);
    });

    // Get currency history
    socket.on('history', async ({ operation, date }) => {
      const history: any = await ExchangesRepository.currencyHistory(
        operation,
        date,
      );

      socket.emit('currencyHistory', history);
    });
  });
}
