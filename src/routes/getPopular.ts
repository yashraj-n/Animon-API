import getListOfAnimes from "../utils/getListOfAnimes";
import getPage from "../utils/getPage";
import app from "../utils/server";
import Client from "../utils/redisDB";

app.get("/api/popular", async (req, rep) => {
  let redisCache = await Client.get(`popular`);
  if (redisCache) {
    rep.send({
      error: false,
      message: "polular (cache)",
      data: JSON.parse(redisCache)
    });
  } else {
    let data = await getListOfAnimes(
      await getPage(`https://ww1.gogoanime2.org/popular`)
    );
    Client.set(`popular`, JSON.stringify(data));
    rep.send({
      error: false,
      message: "popular",
      data,
    });
  }
});
