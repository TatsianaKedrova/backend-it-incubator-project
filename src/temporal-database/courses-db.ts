import { TDBCourses } from "src/dto/courses.types";

export const db: TDBCourses = {
    courses: [
      { id: "1", title: "frontend", studentsCount: 10 },
      { id: "2", title: "backend", studentsCount: 30 },
      { id: "3", title: "AQA", studentsCount: 20 },
      { id: "4", title: "Project Manager", studentsCount: 50 },
    ],
  };
  