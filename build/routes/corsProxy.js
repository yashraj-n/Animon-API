"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const server_1 = __importDefault(require("../utils/server"));
const request_1 = __importDefault(require("request"));
server_1.default.get("/api/corsproxy", (req, rep) => {
    if (!req.query.url) {
        return rep.status(400).send({
            error: "url is required",
        });
    }
    const url = req.query.url;
    let data = [];
    request_1.default
        .get(url, {
        headers: req.headers,
        rejectUnauthorized: false
    })
        .on("data", (chunk) => {
        data.push(chunk);
    })
        .on("complete", () => {
        rep.headers["Content-Type"] = "application/x-mpegURL";
        rep.send(data.join(""));
    });
});
