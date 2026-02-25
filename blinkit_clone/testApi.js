const https = require("https");
https
  .get(
    "https://pharmeasy.in/api/search/search/?q=dabur%20chyawanprash",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    },
    (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => console.log(data.substring(0, 1000)));
    },
  )
  .on("error", console.error);
