//@ts-nocheck
import * as redis from "redis";


const Client = redis.createClient({
  url:process.env.REDIS_URL
});
Client.connect();
Client.on("connect", async () => {
  console.log("Redis client connected");
  setInterval(() => {
    console.log("Flushing Database");
    Client.flushDb().then((e) => {
      console.log("Database flushed");
    });
  }, 3.6e6);
});

Client.on("error", () =>{
  console.log("Redis client error");  
})

export default Client;
