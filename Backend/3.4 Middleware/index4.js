import express from "express";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.post("/submit", (req, res) => {
  const street = req.body['street'];
  const pet = req.body['pet'];
  const BandName = street  + pet;
  res.send(`<h1>Your Band Name is</h1><h2>${BandName}</h2>`);
});

app.get("/",(req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
