"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const getListOfAnimes_1 = __importDefault(require("../utils/getListOfAnimes"));
const getPage_1 = __importDefault(require("../utils/getPage"));
const redisDB_1 = __importDefault(require("../utils/redisDB"));
const server_1 = __importDefault(require("../utils/server"));
server_1.default.post("/api/search", async (req, rep) => {
    if (!req.body.search) {
        rep.status(400).send({
            error: true,
            message: "Please provide a search term",
            data: [],
        });
    }
    let searchParam = encodeURIComponent(req.body.search.toLowerCase().replace(/\s\s+/g, ""));
    let redisData = await redisDB_1.default.get(`search:${searchParam}`);
    if (redisData) {
        rep.status(200).send({
            error: false,
            message: "Search results (Cache)",
            data: JSON.parse(redisData),
        });
    }
    else {
        let body = await (0, getPage_1.default)(`https://ww1.gogoanime2.org/search/${searchParam}`);
        let animeData = await (0, getListOfAnimes_1.default)(body);
        await redisDB_1.default.set(`search:${searchParam}`, JSON.stringify(animeData));
        rep.status(200).send({
            error: false,
            message: "Search results",
            data: animeData,
        });
    }
});
