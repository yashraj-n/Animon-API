//@ts-nocheck
import getPage from "../utils/getPage";
import app from "../utils/server";
import getAnimeData from "../utils/getAnimeData";
import Client from "../utils/redisDB";

app.post("/api/anime/data", async (req, rep) => {
  if (!req.body.id) {
    rep.status(400).send({
      error: true,
      message: "Please provide an anime ID",
      data: {},
    });
  }
  let id = encodeURIComponent(req.body.id.toLowerCase().replace(/\s\s+/g, ""));
  let redisData = await Client.get(`anime:${id}`);
  if (redisData) {
    rep.status(200).send({
      error: false,
      message: "Anime data (Cache)",
      data: JSON.parse(redisData),
    });
  } else {
    let body = await getPage(`https://ww1.gogoanime2.org/anime/${id}`);
    let data = await getAnimeData(body);
    Client.set(`anime:${id}`, JSON.stringify(data));
    rep.status(200).send({
      error: false,
      message: "Anime data",
      data: data,
    });
  }
});
