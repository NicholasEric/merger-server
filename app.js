const fs = require('fs').promises;
require("dotenv").config();

(async () => {
  const endpoint = process.env.API_URL + "api-version=" + process.env.API_VER;
  const apiKey   = process.env.API_KEY;
  const deployment = "dall-e-3";
  const apiVersion = "2024-02-01";

  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey
  };
  const body = {
    prompt: "generate a 756x756 pixel art of burger made of bananas in the center with a plain background",
    size: "1024x1024",
    n: 1,
    quality: "standard",
    style: "vivid"
  };

  // Send POST request
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  
  // Extract image URL from response
  const imageUrl = json.data[0].url;
  console.log("Image URL:", imageUrl);

  // Fetch the image bytes
  const imgRes = await fetch(imageUrl);
  const arrayBuffer = await imgRes.arrayBuffer();
  // Save to file (Node environment)
  await fs.writeFile('generated_image.png', Buffer.from(arrayBuffer));
  console.log("Image saved to generated_image.png");
})();
