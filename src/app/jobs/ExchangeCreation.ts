import ExchangesRepository from '../repositories/ExchangesRepository';

interface IExchange {
  data: {
    send: number;
    receive: number;
    operation: string;
  };
}

export default {
  key: 'ExchangeCreation',
  async handle({ data }: IExchange) {
    const { send, receive, operation } = data;

    await ExchangesRepository.create({
      send,
      receive,
      operation,
    });
  },
};
