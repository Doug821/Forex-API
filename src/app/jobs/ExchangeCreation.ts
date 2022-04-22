import ExchangesRepository from '../repositories/ExchangesRepository';

export default {
  key: 'ExchangeCreation',
  async handle({ data }: any) {
    const { send, receive, operation } = data;

    await ExchangesRepository.create({
      send,
      receive,
      operation,
    });
  },
};
