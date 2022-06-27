"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListOfAnimes_1 = __importDefault(require("../utils/getListOfAnimes"));
const getPage_1 = __importDefault(require("../utils/getPage"));
const server_1 = __importDefault(require("../utils/server"));
const redisDB_1 = __importDefault(require("../utils/redisDB"));
server_1.default.get("/api/popular", async (req, rep) => {
    let redisCache = await redisDB_1.default.get(`popular`);
    if (redisCache) {
        rep.send({
            error: false,
            message: "polular (cache)",
            data: JSON.parse(redisCache)
        });
    }
    else {
        let data = await (0, getListOfAnimes_1.default)(await (0, getPage_1.default)(`https://ww1.gogoanime2.org/popular`));
        redisDB_1.default.set(`popular`, JSON.stringify(data));
        rep.send({
            error: false,
            message: "popular",
            data,
        });
    }
});
