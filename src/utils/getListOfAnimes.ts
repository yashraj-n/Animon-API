import cheerio from "cheerio";
export default async function getListOfAnimes(page: string) {
  let $ = cheerio.load(page);
  let toReturn: {
    title: string;
    image: string;
    released: string;
    id: string;
  }[] = [];
  $(".items li").each(function (i, elem) {
    const title = $(this).find(".name").text().replace(/\s\s+/g, "");
    const image =
      `https://ww1.gogoanime2.org` +
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
