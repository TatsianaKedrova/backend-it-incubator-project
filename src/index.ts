import express from "express";
import serveFavicon from "serve-favicon";
import path from "path";
const app = express();
require("dotenv").config();

const { PORT } = process.env;
app.use(serveFavicon(path.join("favicon.ico")));

const db = {
  courses: [
    { id: "1", title: "frontend" },
    { id: "2", title: "backend" },
    { id: "3", title: "AQA" },
    { id: "4", title: "Project Manager" },
  ],
};

// fetch("http://localhost:3003/courses?title=end").then(res => res.json()).then(res => console.log(res))

app.get("/courses", (req, res) => {
  console.log("query params: ", req.query);
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter(
      (el) => el.title.indexOf(req.query.title as string) > -1
    );
  }
  res.json(foundCourses);
  // if (Object.keys(req.query).length !== 0) {
  //   const filteredCourses = db.courses.filter(
  //     (el) => el.title.indexOf(req.query.title as string) > -1
  //   );
  //   res.json(filteredCourses);
  // } else res.json(db.courses);
});

app.get("/courses/:id", (req, res) => {
  const foundCourse = db.courses.find((el) => el.id === req.params.id);
  if (!foundCourse) {
    res.status(404).send("Course not found for given id");
    return;
  }
  res.json(foundCourse);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
