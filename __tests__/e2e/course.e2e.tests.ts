import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import request from "supertest";
import { app, TPostBodyCourses } from "../../src/settings";

describe("GET/all courses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  test("should return status code 200 and all courses in DB", async () => {
    await request(app).get("/courses").expect(StatusCodes.OK, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app).get("/courses/9999").expect(StatusCodes.NOT_FOUND);
  });

  test("should return 400 if no title was provided and the course shouldn't be created", async () => {
    await request(app)
      .post("/courses")
      .send({ title: "     " })
      .expect(StatusCodes.BAD_REQUEST);

    const getAllExistingCourses = await request(app)
      .get("/courses")
      .expect(StatusCodes.OK);
    expect(getAllExistingCourses).not.toContainEqual({
      id: expect.any(String),
      title: "",
    });
  });

  let createdCourse1: TPostBodyCourses | null = null;
  test("should return status code 201 and newly created course", async () => {
    const createResponse = await request(app)
      .post("/courses")
      .send({ title: "Taniusha is a great girl" })
      .expect(StatusCodes.CREATED)
      .expect("Content-Type", "application/json; charset=utf-8");
    createdCourse1 = createResponse.body;
    expect(createdCourse1).toEqual({
      id: expect.any(String),
      title: "Taniusha is a great girl",
    });

    await request(app).get("/courses").expect(StatusCodes.OK, [createdCourse1]);
  });

  let createdCourse2: TPostBodyCourses | null = null;
  test(`create one more course course with ${StatusCodes.CREATED}`, async () => {
    const postResponse = await request(app)
      .post("/courses")
      .send({ title: "Time is everything, not just money" })
      .expect(StatusCodes.CREATED)
      .expect("Content-Type", "application/json; charset=utf-8");
    createdCourse2 = postResponse.body;

    expect(createdCourse2).toEqual({
      id: expect.any(String),
      title: "Time is everything, not just money",
    });

    await request(app)
      .get("/courses")
      .expect(StatusCodes.OK, [createdCourse1, createdCourse2]);
  });

  test("shouldn't update course with incorrect input data", async () => {
    await request(app)
      .put("/courses/" + createdCourse1?.id)
      .send({ title: "" })
      .expect(StatusCodes.BAD_REQUEST);
    expect(createdCourse1 !== null && createdCourse1.title).toEqual(
      "Taniusha is a great girl"
    );

    await request(app)
      .get("/courses/" + createdCourse1?.id)
      .expect(StatusCodes.OK, createdCourse1);
  });
  test("should update course with correct input data", async () => {
    await request(app)
      .put("/courses/" + createdCourse1?.id)
      .send({
        title: "Ali Aslan is a good example of hard and smart work together",
      })
      .expect(StatusCodes.NO_CONTENT);
    await request(app)
      .get("/courses/" + createdCourse1?.id)
      .expect(StatusCodes.OK, {
        ...createdCourse1,
        title: "Ali Aslan is a good example of hard and smart work together",
      });
    await request(app)
      .get("/courses/" + createdCourse2?.id)
      .expect(StatusCodes.OK, createdCourse2);
  });

  test("shouldn't update course that don't exist", async () => {
    await request(app)
      .put("/courses/2")
      .send({
        title: "Oops, I did something wrong thing!",
      })
      .expect(StatusCodes.NOT_FOUND);
    const getResponse = await request(app)
      .get("/courses/" + createdCourse1?.id)
      .expect(StatusCodes.OK);
    expect(getResponse.body.title).toBe(
      "Ali Aslan is a good example of hard and smart work together"
    );
  });

  test("should delete the particular course", async () => {
    await request(app)
      .delete("/courses/" + createdCourse2?.id)
      .expect(StatusCodes.NO_CONTENT);
    await request(app)
      .get("/courses/" + createdCourse2?.id)
      .expect(StatusCodes.NOT_FOUND);

    await request(app)
      .delete("/courses/" + createdCourse1?.id)
      .expect(StatusCodes.NO_CONTENT);

    await request(app).get("/courses").expect(StatusCodes.OK, []);
  });
});
