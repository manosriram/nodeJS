const express = require("express");
const app = express();
const port = process.env.POST || 3000;
const db = require("./setup/myurl").mongoURL;
const key = require("./setup/myurl").secret;
const mongoose = require("mongoose");

// Connection to the Database.
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(console.log("MongoDB Connected Successfully..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Run the Server.
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
