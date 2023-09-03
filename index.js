import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const catImgAPI_URL = "https://api.thecatapi.com/v1/images/search";
const catFactAPI_URL = "https://catfact.ninja/fact?max_length=140";
const config = {
  headers: {
    'Accept': 'application/json'
  }
};
app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
      const catImgResult = await axios.get(catImgAPI_URL);
      const catFactResult = await axios.get(catFactAPI_URL, config);
      res.render("index.ejs", {
        catImgSrc: catImgResult.data[0].url,
        catFact: catFactResult.data.fact
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(port, () => console.log(`Server listening on port: ${port}`));