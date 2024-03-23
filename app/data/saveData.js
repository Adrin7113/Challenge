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
  console.log(fileDataJson);
  return await fs.writeFile("data.json", JSON.stringify(fileDataJson || []));
}
