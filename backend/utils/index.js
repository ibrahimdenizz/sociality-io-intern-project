const fetch = require("node-fetch");
const cheerio = require("cheerio");

async function scrapeProduct(url, { soldOut } = { soldOut: false }) {
  let html = await fetch(url).then((res) => res.text());
  let $ = cheerio.load(html);

  const name = $('[data-buy-box-listing-title="true"]').text().trim();

  if (soldOut === true && !name) {
    throw new Error("Product not found");
  }
  if (!name) {
    return scrapeProduct(url + "?show_sold_out_detail=1", { soldOut: true });
  }

  const img = $('[data-carousel-first-image=""]').attr("src");
  const price = $(
    'div[data-buy-box-region="price"] p[class="wt-text-title-03 wt-mr-xs-2"]'
  )
    .text()
    .trim()
    .replace("£", "");

  return {
    name,
    img,
    price: Number(price),
  };
}

module.exports = {
  scrapeProduct,
};
