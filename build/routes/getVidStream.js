"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const server_1 = __importDefault(require("../utils/server"));
const getEpisodeServer_1 = __importDefault(require("../utils/getEpisodeServer"));
const getPage_1 = __importDefault(require("../utils/getPage"));
const redisDB_1 = __importDefault(require("../utils/redisDB"));
server_1.default.post("/api/stream", async (req, rep) => {
    if (!req.body.id || !req.body.ep) {
        rep.status(400).send({
            error: true,
            message: "Missing id or ep",
            data: "",
        });
    }
    const { id, ep } = req.body;
    let redisCache = await redisDB_1.default.get(`anime:${id}:${ep}`);
    if (redisCache) {
        rep.status(200).send({
            error: false,
            message: id + " cache",
            data: JSON.parse(redisCache),
        });
    }
    else {
        let serverLink = await (0, getEpisodeServer_1.default)(await (0, getPage_1.default)(`https://ww1.gogoanime2.org/watch/${id}/${ep}`));
        rep.send({
            error: false,
            message: id,
            data: serverLink,
            android: `${serverLink}`.replace("embed", "playlist") + `.m3u8`,
        });
        await redisDB_1.default.set(`anime:${id}:${ep}`, JSON.stringify(serverLink));
    }
});
