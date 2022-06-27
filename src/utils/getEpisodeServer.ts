import cheerio from "cheerio";

export default async function getEpisodeServer(page: string) {
  let $ = cheerio.load(page.match(/(<iframe.+?<\/iframe>)/g)![0]);
  return (
    `https://ww1.gogoanime2.org/embed/` +
    $("iframe").attr("src")?.split("/")[2]
  );
}
