"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
let environment = "development";
const app = (0, fastify_1.default)({
    logger: {
        prettyPrint: environment === "development"
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
exports.default = app;
