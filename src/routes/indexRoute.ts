import app from "../utils/server";

app.get("/", (req, rep) => {
  rep.send({
    message: "API Working!!!",
  });
});
