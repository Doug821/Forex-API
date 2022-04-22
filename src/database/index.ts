const { Client } = require('pg');

const client = new Client({
  host: '172.19.0.2',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'forexexchanges',
});

client.connect();

exports.query = async (query: string, values: any[]) => {
  const { rows } = await client.query(query, values);
  return rows;
};
