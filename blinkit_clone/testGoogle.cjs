const google = require("googlethis");

async function test() {
  const options = {
    page: 0,
    safe: false,
    additional_params: {
      hl: "en",
    },
  };

  const response = await google.image(
    "Dabur Chyawanprash bottle 500g",
    options,
  );
  console.dir(response[0], { depth: null });
}

test();
