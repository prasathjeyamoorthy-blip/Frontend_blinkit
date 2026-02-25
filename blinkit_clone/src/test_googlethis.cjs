const google = require("googlethis");

async function testGoogleThis() {
  try {
    const images = await google.image("Huggies Pant Style Baby Diaper", {
      safe: false,
    });
    console.log("Found images:", images.length);
    if (images.length > 0) {
      console.log("First image:", images[0].url);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

testGoogleThis();
