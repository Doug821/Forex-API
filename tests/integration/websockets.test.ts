/* eslint-disable no-unused-vars */
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import Client, { Socket as SocketClient } from 'socket.io-client';
import ExchangesRepository from '../../src/app/repositories/ExchangesRepository';

const port = '3000';

describe('Websockets tests', () => {
  let io: Server;
  let serverSocket: Socket;
  let clientSocket: SocketClient;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      clientSocket = Client(`http://localhost:${port}`);
      io.on('connection', (socket: Socket) => {
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
