import * as redis from "redis";

export const clientRedis = redis.createClient({
  url: "redis://localhost:6379",
});
async function connect() {
  await clientRedis.connect();
}
connect();
clientRedis.on("error", function (err: any) {
  console.log(err);
  return err;
});

clientRedis.on("connect", function () {
  console.log("Redis Connected");
});

export default clientRedis;
