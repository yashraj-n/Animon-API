"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
async function getListOfAnimes(page) {
    let $ = cheerio_1.default.load(page);
    let toReturn = [];
    $(".items li").each(function (i, elem) {
        const title = $(this).find(".name").text().replace(/\s\s+/g, "");
        const image = `https://ww1.gogoanime2.org` +
            $(this).find(".img").find("img").attr("src");
        const released = $(this).find(".released").text().replace(/\s\s+/g, "");
        //@ts-ignore
        const id = $(this).find(".img").find("a").attr("href").split("/")[2];
        toReturn.push({
            title,
            image,
            released,
            id,
        });
    });
    return toReturn;
}
exports.default = getListOfAnimes;
