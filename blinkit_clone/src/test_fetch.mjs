import fs from "fs";

async function testFetch() {
  const url = "https://via.placeholder.com/400?text=Test";
  try {
    const response = await fetch(url);
    console.log(
      "OK:",
      response.ok,
      "Status:",
      response.status,
      "Text:",
      response.statusText,
    );
    const buffer = Buffer.from(await response.arrayBuffer());
    console.log("Buffer length:", buffer.length);
    fs.writeFileSync("test_img.jpg", buffer);
    console.log("Saved test_img.jpg.");
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

testFetch();
