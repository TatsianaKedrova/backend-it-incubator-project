"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
require("dotenv").config();
const http_status_codes_1 = require("http-status-codes");
const { PORT } = process.env;
app.use((0, serve_favicon_1.default)(path_1.default.join("favicon.ico")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
const db = {
    courses: [
        { id: "1", title: "frontend" },
        { id: "2", title: "backend" },
        { id: "3", title: "AQA" },
        { id: "4", title: "Project Manager" },
    ],
};
//TODO: GET LIST OF COURSES
app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
//TODO: GET COURSE by ID
app.get("/courses/:id", (req, res) => {
    const foundCourse = db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send("Course not found for given id");
        return;
    }
    res.json(foundCourse);
});
//TODO: POST NEW COURSE
app.post("/courses", (req, res) => {
    res.set({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    if (!req.body.title.trim()) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST) });
        return;
    }
    let newCourse = {
        id: new Date().toString(),
        title: req.body.title.trim(),
    };
    db.courses.push(newCourse);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(newCourse);
});
//TODO: DELETE COURSE
app.delete("/courses/:id", (req, res) => {
    const checkIfCourseExists = db.courses.find((course) => course.id === req.params.id);
    if (!checkIfCourseExists) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Id not found" });
        return;
    }
    db.courses = db.courses.filter((course) => course.id !== req.params.id);
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
});
//TODO: UPDATE SOME COURSE
app.put("/courses/:id", (req, res) => {
    if (!req.body.title.trim()) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST) });
        return;
    }
    const foundCourse = db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ message: "Course not found for given id" });
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
});
//# sourceMappingURL=index.js.map