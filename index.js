const fs = require("fs");
const axios = require("axios").default;
const cheerio = require("cheerio");

let url = "https://en.wikipedia.org";
let featuredLinks = [];
let biographies = [];

axios.get("https://en.wikipedia.org/wiki/Portal:History").then((res) => {
  const $ = cheerio.load(res.data);

  $(
    ".portal-column-left > div > div > table > tbody > tr > td > div > ul > li > a[href]"
  ).each((index, elem) => {
    if (index === 0) {
      return;
    }
    featuredLinks[index] = $(elem).attr("href").replace(/^/, url);
  });

  //Get links of daily featured articles dynamically
  featuredLinks = featuredLinks
    .filter((el) => el != undefined)
    .reduce((acc, curr) => acc + "\r\n" + curr);

  fs.writeFile("features-list.txt", featuredLinks, (err) => {
    if (err) {
      console.log(err);
    }
  });

  $(
    ".portal-column-right > div > div > table > tbody > tr > td > div > ul > li > a[href]"
  ).each((index, elem) => {
    if (index === 0) {
      return;
    }
    biographies[index] = $(elem).attr("href").replace(/^/, url);
  });

  //Get links of daily featured biographies dynamically
  biographies = biographies
    .filter((el) => el != undefined)
    .reduce((acc, curr) => acc + "\r\n" + curr);

  fs.writeFile("biographies-list.txt", biographies, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
