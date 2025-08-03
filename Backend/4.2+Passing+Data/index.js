import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.locals.title = "Enter your name here";
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fname = req.body["fName"];
  const lname = req.body["lName"];
  const noOfLetters = fname.length + lname.length;
  res.locals.title = `Your name has ${noOfLetters} letters in it.`;
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
