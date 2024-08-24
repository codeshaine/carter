import redisClient from "../../clients/redisCleint.js";

export function deleteRedisKey(key) {
  redisClient.del(key);
}
