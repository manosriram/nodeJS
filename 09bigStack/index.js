const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server Up and Running!!!");
});

app.listen(port, () => {
  console.log(`Serving Running at ${port}`);
});
