import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "Archit@pass945",
  port: 5432,
});

let countries = [];

db.connect();

// db.query("SELECT country_code FROM visited_countries", (err, res) => {
//   if (err) {
//     console.error("Error executing query", err.stack);
//   } else {
//     countries = res.rows.map(row => row.country_code);
//   }
// });
let error = null;

app.get("/", async (req, res) => {
  let countries = (await db.query("SELECT country_code FROM visited_countries")).rows.map(row => row.country_code);
  console.log(countries);
  res.render("index.ejs",{ countries: countries, total: countries.length,error: error });
});

app.post("/add", async(req, res) => {
  const country = req.body.country;
  const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%'||$1||'%'",[country.toLowerCase()]);
  if(result.rowCount < 1) error = "no country found"
  else{
    const country_code = result.rows[0].country_code;
    try{
      await db.query("INSERT INTO visited_countries(country_code) VALUES($1)",[country_code]);
      error = null;
    } catch {
      error = "already exists";
    }
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
