//@ts-nocheck
import app from "../utils/server";
import getEpisodeServer from "../utils/getEpisodeServer";
import getPage from "../utils/getPage";
import Client from "../utils/redisDB";

app.post("/api/stream", async (req, rep) => {
  if (!req.body.id || !req.body.ep) {
    rep.status(400).send({
      error: true,
      message: "Missing id or ep",
      data: "",
    });
  }

  const { id, ep } = req.body;
  let redisCache = await Client.get(`anime:${id}:${ep}`);
  if (redisCache) {
    rep.status(200).send({
      error: false,
      message: id + " cache",
      data: JSON.parse(redisCache),
    });
  } else {
    let serverLink = await getEpisodeServer(
      await getPage(`https://ww1.gogoanime2.org/watch/${id}/${ep}`)
    );

    rep.send({
      error: false,
      message: id,
      data: serverLink,
      android: `${serverLink}`.replace("embed", "playlist") + `.m3u8`,
    });
    await Client.set(`anime:${id}:${ep}`, JSON.stringify(serverLink));
  }
});
