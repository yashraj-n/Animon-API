//@ts-nocheck
import getListOfAnimes from "../utils/getListOfAnimes";
import getPage from "../utils/getPage";
import Client from "../utils/redisDB";
import app from "../utils/server";

app.post("/api/search", async (req, rep) => {


  if (!req.body.search) {
    rep.status(400).send({
      error: true,
      message: "Please provide a search term",
      data: [],
    });
  }


  let searchParam = encodeURIComponent(
    req.body.search.toLowerCase().replace(/\s\s+/g, "")
  );

  let redisData = await Client.get(`search:${searchParam}`);
  if (redisData) {
    rep.status(200).send({
      error: false,
      message: "Search results (Cache)",
      data: JSON.parse(redisData),
    });
  } else {
    let body = await getPage(
      `https://ww1.gogoanime2.org/search/${searchParam}`
    );
    let animeData = await getListOfAnimes(body);
    await Client.set(`search:${searchParam}`, JSON.stringify(animeData));
    rep.status(200).send({
      error: false,
      message: "Search results",
      data: animeData,
    });
  }
});
