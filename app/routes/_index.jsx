import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { storeData, getData } from "../data/saveData";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const response = useActionData();
  const data = useLoaderData();
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="w-screen h-screen flex justify-center items-center p-20"
    >
      <div className="w-1/2">
        <span>{response ? response.message : ""}</span>
        <Form
          method="post"
          className="flex flex-col justify-center items-center bg-black/80 rounded-lg w-[400px] h-[400px] text-white gap-5"
        >
          <div className="flex items-center gap-5">
            <label htmlFor="title" className="w-12">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className=" text-black"
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="author" className="w-12">
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              className=" text-black"
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="body" className="w-12">
              Body:
            </label>
            <textarea
              type="text"
              id="body"
              name="body"
              required
              className=" text-black"
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="date" className="w-12">
              Date:
            </label>
            <input
              type="text"
              id="date"
              name="date"
              required
              className=" text-black"
            />
          </div>
          <div>
            <button type="submit">Add Task</button>
          </div>
        </Form>
      </div>
      <div className="w-1/2">
        {data.map((task, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-lg m-5">
            <h1>{task.title}</h1>
            <h2>{task.author}</h2>
            <p>{task.body}</p>
            <p>{task.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  const data = await getData();
  return data;
}

export async function action(data) {
  const formData = await data.request.formData();

  const taskData = {
    title: formData.get("title"),
    author: formData.get("author"),
    body: formData.get("body"),
    date: formData.get("date"),
  };
  const atricle = await prisma.article.create({
    data: taskData,
  });
  console.log(atricle);
  await storeData(taskData);
  return {
    status: "ok",
    message: "Record saved",
  };
}
