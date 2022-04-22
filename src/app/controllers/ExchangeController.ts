import { Request, Response } from 'express';
import Queue from '../lib/Queue';
import ExchangesRepository from '../repositories/ExchangesRepository';

class ExchangeController {
  async index(request: Request, response: Response) {
    const exchanges = await ExchangesRepository.findAll();

    response.json(exchanges);
  }

  async store(request: Request, response: Response) {
    const { amount, operation } = request.body;

    if (!amount || !operation) {
      return response.status(400).json({ error: 'Missing required data' });
    }

    if (amount < 0) {
      return response
        .status(400)
        .json({ error: 'The ammount should be a positive number' });
    }

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

    response.status(201).json(exchange);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await ExchangesRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new ExchangeController();
