const express = require("express");
const app = express();
const fetch = require("node-fetch");

const port = process.env.PORT || 5000;

getD = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/todos/3");
  const json = await resp.json();
  console.log(json);
};

getMovie = async () => {
  const res = await fetch("http://www.omdbapi.com/?t=96&apikey=5d43c09e");
  const json = await res.json();
  console.log(json);
};

app.get("/getData", (req, res) => {
  //   getD();
  getMovie();
});

app.listen(port, () => {
  console.log(`Server at ${port}`);
});
