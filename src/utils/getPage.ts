import request from "request";

export default async function getPage(url: string): Promise<string> {
  let promise: Promise<string> = new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
  return promise;
}
