import getListOfAnimes from "../utils/getListOfAnimes";
import getPage from "../utils/getPage";
import app from "../utils/server";
import Client from "../utils/redisDB";

app.get("/api/latest", async (req, rep) => {
  let redisCache = await Client.get(`latest`);
  if (redisCache) {
    rep.send({
      error: false,
      data: JSON.parse(redisCache),
      message: "Latest (cache)",
    });
  } else {
    let data = await getListOfAnimes(
      await getPage(`https://ww1.gogoanime2.org/new-season`)
    );
    Client.set(`latest`, JSON.stringify(data));
    rep.send({
      error: false,
      message: "Latest",
      data,
    });
  }
});
