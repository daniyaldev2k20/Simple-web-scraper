const axios = require("axios").default;
const cheerio = require("cheerio");

function scrapeForLinks(httpLink, cssSelector, url, arr) {
  return axios
    .get(httpLink)
    .then((res) => {
      const $ = cheerio.load(res.data);

      $(cssSelector).each((index, elem) => {
        if (index === 0) {
          return;
        }
        arr[index] = $(elem).attr("href").replace(/^/, url);
      });

      arr = arr
        .filter((el) => el != undefined)
        .reduce((acc, curr) => acc + "\r\n" + curr);

      return arr;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

module.exports = scrapeForLinks;
