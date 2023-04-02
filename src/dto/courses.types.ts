import { Request } from "express";

export type TApiErrorResult = {
  errorsMessages: TFieldError[];
};

export type TFieldError = {
  message: string;
  field: string;
};

export type TDBCourses = {
  [key: string]: CourseType[];
};

export type CourseType = {
  id: string;
  title: string;
  studentsCount: number
};

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestWithParams<P> = Request<P>;
export type RequestWithParamsAndBody<P, T> = Request<P, {}, T>;
