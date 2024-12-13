import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || "localhost",
//   port: process.env.REDIS_PORT || 6379,
//   password: process.env.REDIS_PASSWORD,
//   username: process.env.REDIS_USERNAME,
// });
const redisClient=new Redis(process.env.REDIS_URL)  //production
export default redisClient;
