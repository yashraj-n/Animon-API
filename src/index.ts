import app from "./utils/server";
import fs from "fs";
import path from "path";

import "./utils/redisDB";

let files = fs.readdirSync(path.join(__dirname, "routes"));
for (let file of files) {
  import(`./routes/${file}`);
}

(async () => {
  try {
    //@ts-ignore
    app.listen(process.env.PORT, "0.0.0.0");
    console.log(`[+] Server listening on port ${process.env.PORT}`);
    console.log("Server started on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
})();
