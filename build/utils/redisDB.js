"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const redis = __importStar(require("redis"));
const redis_url = 'redis://default:khkBN4ni9GRQ7QnJm3i0@containers-us-west-61.railway.app:7221';
const Client = redis.createClient({
    url: process.env.REDIS_URL
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
Client.on("error", () => {
    console.log("Redis client error");
});
exports.default = Client;
