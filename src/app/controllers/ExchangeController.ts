/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import ExchangesRepository from '../repositories/ExchangesRepository';

class ExchangeController {
  async index(request: Request, response: Response) {
    const exchanges = await ExchangesRepository.findAll();

    response.json(exchanges);
  }

  async store(request: Request, response: Response) {
    const { send, receive, operation } = request.body;

    if (!send || !receive || !operation) {
      return response.status(400).json({ error: 'Missing required data' });
    }

    if (send < 0 || receive < 0) {
      return response
        .status(400)
        .json({ error: 'The ammount should be a positive number' });
    }

    const exchange = await ExchangesRepository.create({
      send,
      receive,
      operation,
    });

    response.json(exchange);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await ExchangesRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new ExchangeController();
