const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let chai = require("chai"),
  expect = chai.expect;
let chaiHttp = require("chai-http");
var server = require("../../../server.js");

chai.use(chaiHttp);

describe("Helform api tests", function () {
  it("/submit allows correct requests", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };
    testUser = {
      name: "Why you wanna know it?",
      email: "secret@secret.com",
      branch: ["your head", "my foot"],
      year: 1
    };
    submissionData = JSON.parse('{"slotNumber": 2, "humanitiesElectives": []}');
    server.request.user = testUser;
    chai
      .request(server)
      .post("/api/helform/submit")
      .send(submissionData)
      .end(function (err, res) {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.eql({ msg: "Submitted!" });
      });
  });

  it("/submit does not allow non-numerical slot number", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };
    testUser = {
      name: "Why you wanna know it?",
      email: "secret@secret.com",
      branch: ["your head", "my foot"],
      year: 1
    };
    submissionData = JSON.parse('{"slotNumber": "45edfd", "humanitiesElectives": []}');
    server.request.user = testUser;
    chai
      .request(server)
      .post("/api/helform/submit")
      .send(submissionData)
      .end(function (err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/submit does not allow non-array humanities electives", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };
    testUser = {
      name: "Why you wanna know it?",
      email: "secret@secret.com",
      branch: ["your head", "my foot"],
      year: 1
    };
    submissionData = JSON.parse('{"slotNumber": "4", "humanitiesElectives": "fjdfbdf"}');
    server.request.user = testUser;
    chai
      .request(server)
      .post("/api/helform/submit")
      .send(submissionData)
      .end(function (err, res) {
        expect(res.status).to.be.equal(422);
      });
  });
  // After all tests are stop the server
  after(async () => {
    server.stop();
  });
});
