const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(json());

app.get("/flickrs", async (req, res) => {
  return res.send({ messae: "hello!" });
});

const PORT = 7000;

app.listen(PORT, console.log(`server listening on port ${PORT}`));
