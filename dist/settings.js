"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const responseErrorFunction_1 = require("./utils/responseErrorFunction");
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.db = {
    courses: [
        { id: "1", title: "frontend" },
        { id: "2", title: "backend" },
        { id: "3", title: "AQA" },
        { id: "4", title: "Project Manager" },
    ],
};
//TODO: GET LIST OF COURSES
exports.app.get("/courses", (req, res) => {
    let foundCourses = exports.db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title) > -1);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(foundCourses);
});
//TODO: GET COURSE by ID
exports.app.get("/courses/:id", (req, res) => {
    const foundCourse = exports.db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
        res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .send((0, responseErrorFunction_1.responseErrorFunction)("Not found course for given id", "id"));
        return;
    }
    res.send(foundCourse);
});
//TODO: POST NEW COURSE
exports.app.post("/courses", (req, res) => {
    res.set({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    if (!req.body.title.trim()) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json((0, responseErrorFunction_1.responseErrorFunction)("Title is invalid", "Title"));
        return;
    }
    let newCourse = {
        id: /*new Date()*/ Math.random().toString(),
        title: req.body.title.trim(),
    };
    exports.db.courses.push(newCourse);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(newCourse);
});
//TODO: DELETE COURSE
exports.app.delete("/courses/:id", (req, res) => {
    const checkIfCourseExists = exports.db.courses.find((course) => course.id === req.params.id);
    if (!checkIfCourseExists) {
        res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json((0, responseErrorFunction_1.responseErrorFunction)("Not found course for given id", "id"));
        return;
    }
    exports.db.courses = exports.db.courses.filter((course) => course.id !== req.params.id);
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
});
//TODO: UPDATE SOME COURSE
exports.app.put("/courses/:id", (req, res) => {
    if (!req.body.title.trim()) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json((0, responseErrorFunction_1.responseErrorFunction)("Title is invalid!", "Title"));
        return;
    }
    const foundCourse = exports.db.courses.find((el) => el.id === req.params.id);
    if (!foundCourse) {
        res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .send((0, responseErrorFunction_1.responseErrorFunction)("Course not found for given id", "id"));
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
});
//TODO REMOVE ALL COURSES
exports.app.delete("/__test__/data", (req, res) => {
    exports.db.courses = [];
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
});
//# sourceMappingURL=settings.js.map