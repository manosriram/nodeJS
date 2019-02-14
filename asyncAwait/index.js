const express = require('express');
const app = express();

const fetch = require('node-fetch');

const port = process.env.PORT || 5000;


async function getData() {

    const response = await fetch("https://api.github.com/users/octocat/orgs");
    const json = await response.json();
    return json;
}


//app.get("/userInfo", (req, res) => {
  //  console.log(getData());
// });


app.get("/", (req, res) => {
    getData().then(res => console.log(res));
    res.send("Hey there!!");
});

app.listen(port, () => {
    console.log(`Server at ${port}`);
});
