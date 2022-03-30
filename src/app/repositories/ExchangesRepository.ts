import { v4 } from 'uuid';

let exchanges = [
  {
    id: v4(),
    send: 1000,
    receive: 1000,
    operation: 'GBP-USD',
    date: new Date(),
  },
  {
    id: v4(),
    send: 1000,
    receive: 1000,
    operation: 'GBP-USD',
    date: new Date(),
  },
  {
    id: '1',
    send: 1000,
    receive: 1000,
    operation: 'GBP-USD',
    date: new Date(),
  },
];

interface Exchange {
  id: string;
  send: number;
  receive: number;
  operation: string;
  date: Date;
}

class ExchangesRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(exchanges);
    });
  }

  findById(id: string) {
    return new Promise((resolve) => {
      resolve(exchanges.find((exchange: Exchange) => exchange.id === id));
    });
  }

  delete(id: string) {
    return new Promise<void>((resolve) => {
      exchanges = exchanges.filter((exchange: Exchange) => exchange.id !== id);
      resolve();
    });
  }

  create({
    send,
    receive,
    operation,
  }: {
    send: number;
    receive: number;
    operation: string;
  }) {
    return new Promise((resolve) => {
      const newExchange = {
        id: v4(),
        send,
        receive,
        operation,
        date: new Date(),
      };

      exchanges.push(newExchange);
      resolve(newExchange);
    });
  }
}

export default new ExchangesRepository();
