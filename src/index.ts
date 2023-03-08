import express from "express";
import serveFavicon from "serve-favicon";
import path from "path";
const app = express();
require("dotenv").config();
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

const { PORT } = process.env;
app.use(serveFavicon(path.join("favicon.ico")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

type TDBCourses = {
  [key: string]: TPostBodyCourses[];
};

const db: TDBCourses = {
  courses: [
    { id: "1", title: "frontend" },
    { id: "2", title: "backend" },
    { id: "3", title: "AQA" },
    { id: "4", title: "Project Manager" },
  ],
};

console.log("database: ", db);

/*fetch("http://localhost:3003/courses", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify({ title: "Successful Tania Kedrova" }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));*/

type TPostBodyCourses = {
  id: string;
  title: string;
};

app.get("/courses", (req, res) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter(
      (el) => el.title.indexOf(req.query.title as string) > -1
    );
  }
  res.json(foundCourses);
});

app.post("/courses", (req, res) => {
  res.set({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  console.log(req.body.title);

  //400 error if title is an empty string
  if (!req.body.title.trim()) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
    return;
  }

  let newCourse: TPostBodyCourses = {
    id: new Date().toString(),
    title: req.body.title.trim(),
  };
  db.courses.push(newCourse);
  console.log("database: ", db);
  res.json(newCourse);
});

app.get("/courses/:id", (req, res) => {
  const foundCourse = db.courses.find((el) => el.id === req.params.id);
  if (!foundCourse) {
    res.status(404).send("Course not found for given id");
    return;
  }
  res.status(201).json(foundCourse);
});
