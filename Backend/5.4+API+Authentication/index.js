import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Archit";
const yourPassword = "Srivastava";
const yourAPIKey = "fcddbfac-cd4d-475b-9a0f-065772584dc6";
const yourBearerToken = "8531d8bc-0324-4d26-bcbf-cc280ab51389";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  const response = await axios.get(`${API_URL}random`);
  const result = response.data;
  res.render("index.ejs", { content: result.secret });
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const response = await axios.get(`${API_URL}all?page=1`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    res.render("index.ejs", {
      content: result[Math.floor(Math.random() * result.length)].secret,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}filter?score=5&apiKey=${yourAPIKey}`
    );
    //TODO 4: Write your code here to hit up the /filter endpoint
    //Filter for all secrets with an embarassment score of 5 or greater
    //HINT: You need to provide a query parameter of apiKey in the request.
    const result = response.data;
    res.render("index.ejs", {
      content: result[Math.floor(Math.random() * result.length)].secret,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = response.data;
    res.render("index.ejs", {
      content: result.secret,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
