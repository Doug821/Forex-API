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

    const exchange = await ExchangesRepository.create({
      send,
      receive,
      operation,
    });

    response.json(exchange);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const exchange = await ExchangesRepository.findById(id);

    if (!exchange) {
      return response.status(404).json({ error: 'Exchange not found' });
    }

    await ExchangesRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new ExchangeController();
