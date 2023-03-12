import assert from "assert";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import supertest from "supertest";
import request from "supertest";
import { app, db } from "../../src/index";

describe("GET/all courses", () => {
  beforeEach(async () => {
    await request(app).delete("/__test__/data");
  });

  test("should return status code 200 and all courses in DB", async () => {
    await request(app).get("/courses").expect(StatusCodes.OK, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app).get("/courses/9999").expect(StatusCodes.NOT_FOUND);
  });

  test("should return status code 201 and newly created course", async () => {
    await request(app)
      .post("/courses")
      .send({ title: "Taniusha is a great girl" })
      .expect(StatusCodes.CREATED)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("should return 400 if no title was provided and the course shouldn't be created", async () => {
    await request(app)
      .post("/courses")
      .send({ title: "     " })
      .expect(StatusCodes.BAD_REQUEST);

    await request(app).get("/courses").expect(StatusCodes.OK, []);
  });
});
