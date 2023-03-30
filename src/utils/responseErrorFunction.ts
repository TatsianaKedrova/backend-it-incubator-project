import { TApiErrorResult } from "src/dto/courses.types";

export const responseErrorFunction = (
  message: string,
  field: string
): TApiErrorResult => {
  return {
    errorsMessages: [{ message, field }],
  };
};
