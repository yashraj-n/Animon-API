"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListOfAnimes_1 = __importDefault(require("../utils/getListOfAnimes"));
const getPage_1 = __importDefault(require("../utils/getPage"));
const server_1 = __importDefault(require("../utils/server"));
const redisDB_1 = __importDefault(require("../utils/redisDB"));
server_1.default.get("/api/latest", async (req, rep) => {
    let redisCache = await redisDB_1.default.get(`latest`);
    if (redisCache) {
        rep.send({
            error: false,
            data: JSON.parse(redisCache),
            message: "Latest (cache)",
        });
    }
    else {
        let data = await (0, getListOfAnimes_1.default)(await (0, getPage_1.default)(`https://ww1.gogoanime2.org/new-season`));
        redisDB_1.default.set(`latest`, JSON.stringify(data));
        rep.send({
            error: false,
            message: "Latest",
            data,
        });
    }
});
