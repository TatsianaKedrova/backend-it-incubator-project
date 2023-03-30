import { Request } from "express";

export type TApiErrorResult = {
  errorsMessages: TFieldError[];
};

export type TFieldError = {
  message: string;
  field: string;
};

export type TDBCourses = {
  [key: string]: TPostBodyCourse[];
};

export type TPostBodyCourse = {
  id: string;
  title: string;
};

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestWithParams<P> = Request<P>;
export type RequestWithParamsAndBody<P, T> = Request<P, {}, T>;
