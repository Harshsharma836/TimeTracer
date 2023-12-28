import * as redis from "redis";

export const clientRedis = redis.createClient({
  url: "redis://localhost:6379",
});

clientRedis.connect();

clientRedis.on("error", function (err: any) {
  console.log(err);
  return err;
});

export default clientRedis;
