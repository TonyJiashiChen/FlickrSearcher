const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

const base_url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.API_KEY}&tags=sky&format=json&nojsoncallback=1`;

app.get("/flickrs", async (req, res) => {
  const result = await axios.get(base_url, {});
  return res.send(result.data);
});

const PORT = 8099;

app.listen(PORT, console.log(`server listening on port ${PORT}`));
