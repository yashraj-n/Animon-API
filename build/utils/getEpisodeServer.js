"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
async function getEpisodeServer(page) {
    let $ = cheerio_1.default.load(page.match(/(<iframe.+?<\/iframe>)/g)[0]);
    return (`https://ww1.gogoanime2.org/embed/` +
        $("iframe").attr("src")?.split("/")[2]);
}
exports.default = getEpisodeServer;
