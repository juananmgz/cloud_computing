import app from "./server/server";

app.listen(4002, () => {
  return console.log(
    `${new Date()} server is listening on 4002`
  );
});
