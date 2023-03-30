import { responseErrorFunction } from "./utils/responseErrorFunction";
import express, { Response } from "express";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
  TApiErrorResult,
  TDBCourses,
  TPostBodyCourse,
} from "./dto/courses.types";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const db: TDBCourses = {
  courses: [
    { id: "1", title: "frontend" },
    { id: "2", title: "backend" },
    { id: "3", title: "AQA" },
    { id: "4", title: "Project Manager" },
  ],
};

//TODO: GET LIST OF COURSES
app.get(
  "/courses",
  (
    req: RequestWithQuery<{ title: string }>,
    res: Response<TPostBodyCourse[]>
  ) => {
    let foundCourses = db.courses;
    if (req.query.title) {
      foundCourses = foundCourses.filter(
        (el) => el.title.indexOf(req.query.title) > -1
      );
    }
    res.status(StatusCodes.OK).json(foundCourses);
  }
);

//TODO: GET COURSE by ID
app.get(
  "/courses/:id",
  (
    req: RequestWithParams<{ id: string }>,
    res: Response<TPostBodyCourse | TApiErrorResult>
  ) => {
    const foundCourse = db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(responseErrorFunction("Not found course for given id", "id"));
      return;
    }
    res.send(foundCourse);
  }
);

//TODO: POST NEW COURSE
app.post(
  "/courses",
  (
    req: RequestWithBody<{ title: string }>,
    res: Response<TPostBodyCourse | TApiErrorResult>
  ) => {
    res.set({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    if (!req.body.title.trim()) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(responseErrorFunction("Title is invalid", "Title"));
      return;
    }

    let newCourse: TPostBodyCourse = {
      id: /*new Date()*/ Math.random().toString(),
      title: req.body.title.trim(),
    };
    db.courses.push(newCourse);
    res.status(StatusCodes.CREATED).json(newCourse);
  }
);

//TODO: DELETE COURSE
app.delete(
  "/courses/:id",
  (req: RequestWithParams<{ id: string }>, res: Response<TApiErrorResult>) => {
    const checkIfCourseExists = db.courses.find(
      (course) => course.id === req.params.id
    );
    if (!checkIfCourseExists) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(responseErrorFunction("Not found course for given id", "id"));
      return;
    }

    db.courses = db.courses.filter((course) => course.id !== req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
);

//TODO: UPDATE SOME COURSE
app.put(
  "/courses/:id",
  (
    req: RequestWithParamsAndBody<{ id: string }, { title: string }>,
    res: Response<TApiErrorResult>
  ) => {
    if (!req.body.title.trim()) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(responseErrorFunction("Title is invalid!", "Title"));
      return;
    }

    const foundCourse = db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(responseErrorFunction("Course not found for given id", "id"));
      return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
);

//TODO REMOVE ALL COURSES
app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(StatusCodes.NO_CONTENT);
});
