import app from "./app.js";
import dotenv from "dotenv";
import prismaClient from "./clients/prismaClient.js";
import redisClient from "./clients/redisCleint.js";
dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Checking the  connection establishment
(async () => {

  try {
    redisClient.on("connect", () => {
      console.log("Connected to Redis successfully.");
    });
    await prismaClient.$connect();
    console.log("Connected to Postgress(Primsa)  successfully");
  } catch (err) {
    console.error("Error occured during Db connection: ", err);
  }
})();

// Releasing resource before the termination of server
process.on("SIGINT", async () => {
  redisClient.quit(() => {
    console.log(
      "Disconnected from Redis after waiting for pending operations."
    );
  });


  await prismaClient.$disconnect();
  console.log("Redis and DB disconnected");
  process.exit(0);
});

app.listen(port, () =>
  console.log(`server running in http://localhost:${port}`)
);
