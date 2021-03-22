/**
 * Users test script.
 * 
 * @summary Test all functionalities of users.
 * @author Daniele Tentoni
 * @since 1.0.0
 */

const User = require("../models/user.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Users", async () => {
  // Clean user db each run. To improve.
  beforeEach(async () => {
    const before = await User.deleteMany({}, (error) => {
      if (error) {
        return error;
      }
    });
  });

  describe("Get users", async () => {
    it("should get all users", async () => {
      const result = await chai.request(server)
        .get("/api/users");
      result.should.have.status(200);
      result.body.should.be.a("array");
      result.body.length.should.be.eql(0);
    });
  });

  describe("Post a new user", async () => {
    // Check all failure cases.
    it("should not post a new user without name", async () => {
      const user = {};
      const result = await chai.request(server)
        .post("/api/user")
        .send(user);
      result.should.have.status(500);
      result.body.should.be.a("object");
      console.log(result.body);
      result.body.should.have.property("description");
    });

    // Check all sucessful cases.
    it("should post a new user with a name", async () => {
      const name = "Tento";
      const user = { name };
      const result = await chai.request(server)
        .post("/api/user")
        .send(user);
      result.should.have.status(200);
      result.body.should.be.a("object");
      result.body.should.have.property("name").eql(name);
    });
  });
});