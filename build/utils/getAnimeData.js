"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
async function getAnimeData(body) {
    let $ = cheerio_1.default.load(body);
    let animeData = {};
    let image = `https://ww1.gogoanime2.org` +
        $(".anime_info_body_bg").find("img").attr("src");
    let title = $(".anime_info_body_bg").find("h1").text();
    let type = "";
    let desc = "";
    let genre = "";
    let releaased = "";
    let status = "";
    let othername = "";
    let episodes = [];
    //@ts-ignore
    $(".anime_info_body_bg")
        .find(".type")
        .each((i, el) => {
        if (i === 0) {
            type = $(el).text().replace(/\s\s+/g, "");
        }
        else if (i === 1) {
            desc = $(el).text().replace(/\s\s+/g, "");
        }
        else if (i === 2) {
            genre = $(el).text().replace(/\s\s+/g, "");
        }
        else if (i === 3) {
            releaased = $(el).text().replace(/\s\s+/g, "");
        }
        else if (i === 4) {
            status = $(el).text().replace(/\s\s+/g, "");
        }
        else if (i === 5) {
            othername = $(el).text().replace(/\s\s+/g, "");
        }
    });
    $("#episode_related li").each((i, el) => {
        episodes.push({
            name: $(el).find(".name").text().replace(/\s\s+/g, ""),
            cate: $(el).find(".cate").text().replace(/\s\s+/g, ""),
        });
    });
    animeData = {
        image,
        title,
        type,
        desc,
        genre,
        releaased,
        status,
        othername,
        episodes,
    };
    return animeData;
}
exports.default = getAnimeData;
