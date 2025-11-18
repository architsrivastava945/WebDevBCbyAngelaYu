import express from "express";
import bodyParser from "body-parser";
import pg from 'pg'

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'Archit@pass945',
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    const result = await db.query(query, [email, password]);
    console.log("Data inserted successfully:", result);
    res.render("secrets.ejs");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try{
    const user = (await db.query('SELECT * FROM users WHERE email = $1', [email])).rows;
    if (user.length > 0) {
      if (user[0].password === password) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
