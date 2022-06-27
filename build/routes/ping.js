"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../utils/server"));
server_1.default.get("/api/ping", (req, rep) => {
    rep.send({
        message: "API Working!!!",
    });
});
