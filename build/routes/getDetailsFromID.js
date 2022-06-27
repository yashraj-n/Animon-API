"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const getPage_1 = __importDefault(require("../utils/getPage"));
const server_1 = __importDefault(require("../utils/server"));
const getAnimeData_1 = __importDefault(require("../utils/getAnimeData"));
const redisDB_1 = __importDefault(require("../utils/redisDB"));
server_1.default.post("/api/anime/data", async (req, rep) => {
    if (!req.body.id) {
        rep.status(400).send({
            error: true,
            message: "Please provide an anime ID",
            data: {},
        });
    }
    let id = encodeURIComponent(req.body.id.toLowerCase().replace(/\s\s+/g, ""));
    let redisData = await redisDB_1.default.get(`anime:${id}`);
    if (redisData) {
        rep.status(200).send({
            error: false,
            message: "Anime data (Cache)",
            data: JSON.parse(redisData),
        });
    }
    else {
        let body = await (0, getPage_1.default)(`https://ww1.gogoanime2.org/anime/${id}`);
        let data = await (0, getAnimeData_1.default)(body);
        redisDB_1.default.set(`anime:${id}`, JSON.stringify(data));
        rep.status(200).send({
            error: false,
            message: "Anime data",
            data: data,
        });
    }
});
