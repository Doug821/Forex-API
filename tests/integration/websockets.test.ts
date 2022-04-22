/* eslint-disable no-unused-vars */
import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import ExchangesRepository from '../../src/app/repositories/ExchangesRepository';

const port = '3000';

describe('Websockets tests', () => {
  let io: any;
  let serverSocket: any;
  let clientSocket: any;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      clientSocket = Client(`http://localhost:${port}`);
      io.on('connection', (socket: any) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('Should return all the exchanges on the database)', (done) => {
    clientSocket.emit('sendExchanges', async (arg: string) => {
      const exchanges: any = await ExchangesRepository.findAll();
      expect(JSON.stringify(arg)).toBe(JSON.stringify(exchanges));
      done();
    });
  });
});
