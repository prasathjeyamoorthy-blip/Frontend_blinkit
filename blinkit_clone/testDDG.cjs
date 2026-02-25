const { image_search } = require("duckduckgo-images-api");
async function test() {
  try {
    const results = await image_search({
      query: "Dabur Chyawanprash",
      moderate: false,
    });
    console.log(results[0].thumbnail);
    console.log(results[0].image);
  } catch (err) {
    console.error(err);
  }
}
test();
