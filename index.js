import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "Guts123";
const yourPassword = "Paismygirl25";
const yourAPIKey = "48880c05-2b29-45c7-9c1f-3250e86c0239";
const yourBearerToken = "4f5d5f67-16eb-4fb5-8ba5-f0a04d6f9825";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);
    const content = JSON.stringify(response.data)
    res.render("index.ejs", {
      content : content
    })
  }catch{
    console.log("error")
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword
      },
    });
    const content = JSON.stringify(response.data);
    res.render("index", { content }); 
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("An error occurred while fetching data from the API.");
  }
});


app.get("/apiKey", async (req, res) => {
try {
  const response = await axios.get(`${API_URL}filter?score=5`,{
    params: {
      apiKey: yourAPIKey,
    }
  })
  const content = JSON.stringify(response.data)
  res.render("index.ejs", {
    content : content
  })
} catch (error) {
  res.status(404).send(error.message);
}
});

app.get("/bearerToken", async (req, res) => {
  try {
    const config = {
      headers: { Authorization:`bearer : ${yourBearerToken}`}
    }

    const response = await axios.get(`${API_URL}/secrets/42`,config)
    const content = JSON.stringify(response.data)
    res.render("index.ejs", {
      content : content
    })
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
