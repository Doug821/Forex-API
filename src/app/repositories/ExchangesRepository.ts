import moment from 'moment';
import dotenv from 'dotenv';
import api from '../../services/api';
import { IConversion } from '../../services/conversionInterface';

dotenv.config();
const key = process.env.APIKEY;

const db = require('../../database');

class ExchangesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM exchanges');
    return rows;
  }

  async delete(id: string) {
    const exchange = db.query('DELETE FROM exchanges WHERE id = $1', [id]);
    return exchange;
  }

  async create({
    send,
    receive,
    operation,
  }: {
    send: number;
    receive: number;
    operation: string;
  }) {
    const [row] = await db.query(
      `
        INSERT INTO exchanges(send, receive, operation)
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [send, receive, operation],
    );
    return row;
  }

  async currencyConverter(amount: number, operation: string) {
    // return new Promise((resolve) => {
    if (amount && operation) {
      const convertedAmount: IConversion = await api
        .get(`convert?q=${operation}&compact=ultra&apiKey=${key}`)
        .then((response) => {
          const exchangeType = Object.values(response.data)[0];
          const exchange = amount * Number(exchangeType);
          // resolve({ baseRate: Number(exchangeType), exchange });
          return { baseRate: Number(exchangeType), exchange };
        });
      return convertedAmount;
    }
    // });
  }

  currencyHistory(operation: string, date: string) {
    return new Promise((resolve) => {
      if (!operation || !date) {
        resolve({ error: 'Invalid credentials' });
      } else {
        const [year, month, day] = date.split('-');
        const currentlyDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );
        const dayWrapper = moment(currentlyDate).subtract(7, 'days').toDate();
        const startDateISOS = new Date(dayWrapper).toISOString();
        const startDate = startDateISOS.substring(0, 10);

        let exchangeType;
        if (operation === 'GBP to USD') {
          exchangeType = 'GBP_USD';
        } else {
          exchangeType = 'USD_GBP';
        }

        api
          .get(
            `convert?q=${exchangeType}&compact=ultra&date=${startDate}&endDate=${date}&apiKey=${key}`,
          )
          .then((response) => {
            resolve(response.data);
          });
      }
    });
  }
}

export default new ExchangesRepository();
