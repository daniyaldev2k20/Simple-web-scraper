const fs = require("fs");
const axiosRequest = require("./axiosRequest");

let url = "https://en.wikipedia.org";
let featuredArticles = [];
let featuredBiographies = [];

//Get links of daily featured articles dynamically
axiosRequest(
  "https://en.wikipedia.org/wiki/Portal:History",
  ".portal-column-left > div > div > table > tbody > tr > td > div > ul > li > a[href]",
  url,
  featuredArticles
).then((articles) => {
  fs.writeFile("features-articles.txt", articles, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

//Get links of daily featured biographies dynamically
axiosRequest(
  "https://en.wikipedia.org/wiki/Portal:History",
  ".portal-column-right > div > div > table > tbody > tr > td > div > ul > li > a[href]",
  url,
  featuredBiographies
).then((biographies) => {
  fs.writeFile("biographies-list.txt", biographies, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
