const express = require('express');
const app = express();

const fetch = require('node-fetch');

const port = process.env.PORT || 5000;


async function getData() {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json()).then(res1 => console.log(res1));
    return response;
}


//app.get("/userInfo", (req, res) => {
  //  console.log(getData());
// });

getData().then(res => console.log(res));

app.listen(port, () => {
    console.log(`Server at ${port}`);
});
