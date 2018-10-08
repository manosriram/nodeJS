const express = require("express");
const app = express();
const port = 5000;

app.get("/api", (req, res) => {
  const laps = [
    { apple: "MacOS Mojave" },
    { windows: "Windows 10" },
    { ubuntu: "UbuntuOS" }
  ];

  res.json(laps);
});

app.listen(5000, () => console.log(`Server Running at port ${port}`));
