import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Archit@pass945",
  port: 5432,
});

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async(req, res) => {
  try{
    items = await((await db.query("SELECT * FROM items")).rows);
    console.log("fetched");
  }catch(err){
    console.log("failed : ",err);
  }
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });
  try{
    await db.query("INSERT INTO items(title) VALUES($1)",[item]);
    console.log("inserted");
  }catch(err){
    console.log("failed : ",err);
  }
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  try{
    await db.query("UPDATE items SET title = $1 WHERE id = $2",[title, id]);
    console.log("updated");
  }catch(err){
    console.log("failed : ",err);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  try{
    db.query("DELETE FROM items WHERE id = $1",[id]);
    console.log("deleted");
  }catch(err){
    console.log("failed : ",err);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
