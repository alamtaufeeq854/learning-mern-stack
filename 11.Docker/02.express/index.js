const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello world from a dockerized app !");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
