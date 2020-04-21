const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let chai = require("chai"),
  expect = chai.expect;
let chaiHttp = require("chai-http");
var server = require("../../../server/server.js");

chai.use(chaiHttp);

describe("Helform api tests", function() {
  it("/submit allows correct requests", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse('{"slotNumber": 2, "humanitiesElectives": []}');
    chai
      .request(server)
      .post("/api/helform/submit")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.eql({ msg: "Submitted!" });
      });
  });

  it("/submit does not allow non-numerical slot number", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse(
      '{"slotNumber": "45edfd", "humanitiesElectives": []}'
    );
    chai
      .request(server)
      .post("/api/helform/submit")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/submit does not allow non-array humanities electives", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse(
      '{"slotNumber": 4, "humanitiesElectives": "fjdfbdf"}'
    );
    chai
      .request(server)
      .post("/api/helform/submit")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/firstlogin works for correct request", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse(
      '{"email": "foo.bar@baz.com", "studentBranch": ["CS"], "year": 2020}'
    );
    chai
      .request(server)
      .post("/api/helform/firstlogin")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(201);
      });
  });

  it("/firstlogin does not allow malformed emails", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse(
      '{"email": "foo.bar@", "studentBranch": ["CS"], "year": 2020}'
    );
    chai
      .request(server)
      .post("/api/helform/firstlogin")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/firstlogin does not allow non array branches", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse(
      '{"email": "foo.bar@baz.com", "studentBranch": "CS", "year": 2020}'
    );
    chai
      .request(server)
      .post("/api/helform/firstlogin")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/firstlogin does not allow non numerical years", async function() {
    server.request.isAuthenticated = function() {
      return true;
    };
    submissionData = JSON.parse(
      '{"email": "foo.bar@baz.com", "studentBranch": ["CS"], "year": "abcd"}'
    );
    chai
      .request(server)
      .post("/api/helform/firstlogin")
      .send(submissionData)
      .end(function(err, res) {
        expect(res.status).to.be.equal(422);
      });
  });
});
