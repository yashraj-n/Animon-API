import fastify from "fastify";
let environment = "development";
const app = fastify({
  logger: {
    prettyPrint:
      environment === "development"
        ? {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          }
        : false,
  },
}).register(require("fastify-cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default app;
