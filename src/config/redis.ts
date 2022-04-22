// export default {
//   host: '172.19.0.1',
//   port: 6379,
// };

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
