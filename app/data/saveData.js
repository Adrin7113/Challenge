import fs from "fs/promises";

export async function getData() {
  const fileData = await fs.readFile("data.json", { encoding: "utf-8" });
  return JSON.parse(fileData);
}

export async function storeData(data) {
  const fileDataJson = await getData();
  if (fileDataJson) {
    fileDataJson.push(data);
  }
  await fetch("http://localhost:8000/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(fileDataJson);
  return await fs.writeFile("data.json", JSON.stringify(fileDataJson || []));
}
