import { responseErrorFunction } from "./utils/responseErrorFunction";
import express, { Response } from "express";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import {
  CourseType,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
  TApiErrorResult,
} from "./dto/courses.types";
import { db } from "./temporal-database/courses-db";
import { CourseCreateModel } from "./dto/CreateCourseModel";
import { CourseUpdateModel } from "./dto/UpdateCourseModel";
import { QueryCoursesModel } from "./dto/QueryCoursesModel";
import { CourseViewModel } from "./dto/CourseViewModel";
import { URIParamsCourseModel } from "./dto/URIParamsCourseIdModel";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: GET LIST OF COURSES
app.get(
  "/courses",
  (
    req: RequestWithQuery<QueryCoursesModel>,
    res: Response<CourseViewModel[]>
  ) => {
    let foundCourses = db.courses;
    if (req.query.title) {
      foundCourses = foundCourses.filter(
        (el) => el.title.indexOf(req.query.title) > -1
      );
    }
    res.status(StatusCodes.OK).json(
      foundCourses.map((dbCourse) => {
        return {
          id: dbCourse.id,
          title: dbCourse.title,
        };
      })
    );
  }
);

//TODO: GET COURSE by ID
app.get(
  "/courses/:id",
  (
    req: RequestWithParams<URIParamsCourseModel>,
    res: Response<CourseViewModel | TApiErrorResult>
  ) => {
    const foundCourse = db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(responseErrorFunction("Not found course for given id", "id"));
      return;
    }
    res.send({
      id: foundCourse.id,
      title: foundCourse.title,
    });
  }
);

//TODO: POST NEW COURSE
app.post(
  "/courses",
  (
    req: RequestWithBody<CourseCreateModel>,
    res: Response<CourseViewModel | TApiErrorResult>
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

    let newCourse: CourseType = {
      id: /*new Date()*/ Math.random().toString(),
      title: req.body.title.trim(),
      studentsCount: 0,
    };
    db.courses.push(newCourse);
    res.status(StatusCodes.CREATED).json(newCourse);
  }
);

//TODO: DELETE COURSE
app.delete(
  "/courses/:id",
  (req: RequestWithParams<URIParamsCourseModel>, res: Response<TApiErrorResult>) => {
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
    req: RequestWithParamsAndBody<URIParamsCourseModel, CourseUpdateModel>,
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
