import cheerio from "cheerio";

export default async function getAnimeData(body: string) {
  let $ = cheerio.load(body);
  let animeData = {};

  let image =
    `https://ww1.gogoanime2.org` +
    $(".anime_info_body_bg").find("img").attr("src");
  let title = $(".anime_info_body_bg").find("h1").text();
  let type = "";
  let desc = "";
  let genre = "";
  let releaased = "";
  let status = "";
  let othername = "";
  let episodes: { name: string; cate: string; }[] = [];
  //@ts-ignore
  $(".anime_info_body_bg")
    .find(".type")
    .each((i, el) => {
      if (i === 0) {
        type = $(el).text().replace(/\s\s+/g, "");
      } else if (i === 1) {
        desc = $(el).text().replace(/\s\s+/g, "");
      } else if (i === 2) {
        genre = $(el).text().replace(/\s\s+/g, "");
      } else if (i === 3) {
        releaased = $(el).text().replace(/\s\s+/g, "");
      } else if (i === 4) {
        status = $(el).text().replace(/\s\s+/g, "");
      } else if (i === 5) {
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
