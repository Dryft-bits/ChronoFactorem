const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let chai = require("chai"),
  expect = chai.expect;
let chaiHttp = require("chai-http");
var server = require("../../../server.js");

chai.use(chaiHttp);

describe("Auth api tests", function() {
  // [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated : is expected, and an issue with node
  it("/loggedin does not allow unauthenticated user", async function() {
    // Force middleware to think we're not authenticated
    server.request.isAuthenticated = function() {
      return false;
    };
    testUser = {
      name: "Why you wanna know it?",
      email: "secret@secret.com",
      branch: ["your head", "my foot"],
      year: 1
    };
    server.request.user = testUser;
    chai
      .request(server)
      .get("/api/loggedin")
      .end(function(err, res) {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.eql({ msg: "Login failed" });
      });
  });

  it("/loggedin returns correct user", async function() {
    // Force the middleware to think we're already authenticated.
    server.request.isAuthenticated = function() {
      return true;
    };
    testUser = {
      name: "Why you wanna know it?",
      email: "secret@secret.com",
      branch: ["your head", "my foot"],
      year: 1
    };
    server.request.user = testUser;
    chai
      .request(server)
      .get("/api/loggedin")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.eql(testUser);
      });
  });

  it("/logout logs out", async function() {
    chai
      .request(server)
      .get("/api/logout")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.eql({ msg: "Logged out" });
      });
  });

  // After all tests are stop the server
  after(async () => {
    server.stop();
  });
});
