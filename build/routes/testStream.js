"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../utils/server"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
server_1.default.get("/api/test", (req, rep) => {
    let toreturn = "";
    (0, cross_fetch_1.default)("https://ww1.gogoanime2.org/playlist/MTU2MTEx.m3u8").then((data) => {
        data.text().then((text) => {
            rep.header("Content-Type", "application/x-mpegURL");
            text.split("\n").forEach((line) => {
                if (line.startsWith("http")) {
                    toreturn += (`http://localhost:3000/api/corsproxy?url=${line}`) + "\n";
                }
                else {
                    toreturn += line + "\n";
                }
            });
            return rep.send(toreturn);
        });
    });
});
