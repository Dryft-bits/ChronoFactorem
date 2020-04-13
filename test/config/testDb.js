const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Hel = require("../../models/Hel");

let chai = require("chai"),
  should = chai.should(),
  expect = chai.expect;

describe("Database Tests", function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function(done) {
    this.timeout(10000);
    mongoose.connect(process.env.mongoURITest, {
      // Change deprecated settings to resolve warnings
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function() {
      console.log("Connected to test database!");
      for (let i = 0; i < 50; i++) {
        let testHel = Hel({
          courseName: "TestHel".concat(i.toString()),
          studentsInterestedInSlot: {
            0: Math.floor(Math.random() * 1000),
            1: Math.floor(Math.random() * 1000),
            2: Math.floor(Math.random() * 1000),
            3: Math.floor(Math.random() * 1000),
            4: Math.floor(Math.random() * 1000),
            5: Math.floor(Math.random() * 1000),
            6: Math.floor(Math.random() * 1000),
            7: Math.floor(Math.random() * 1000)
          }
        });
        testHel.save();
      }
      done();
    });
  });

  describe("Test Database read/write", function() {
    it("New hel saving completes", function(done) {
      this.timeout(5000);
      let testHel = Hel({
        courseName: "TestHel",
        studentsInterestedInSlot: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0
        }
      });
      testHel.save(done);
    });

    it("All hels are stored", async function() {
      let hels = await Hel.find();
      expect(hels.length).to.be.equal(51);
    });

    it("Valid/invalid searches return expected value", async function() {
      let hel1 = await Hel.findOne({ courseName: "TestHel1" });
      hel1.courseName.should.be.eql("TestHel1");
      let helNone = await Hel.findOne({ courseName: "TestHel120" });
      expect(helNone).to.equal(null);
    });

    it("Object validation works", function(done) {
      //Attempt to save with wrong info. An error should trigger
      let testHel = Hel({
        studentsInterestedInSlot: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0
        }
      });
      testHel.save(function(err) {
        if (err) {
          done();
        } else {
          throw new Error("Should have thrown error");
        }
      });
    });

    // After all tests are finished drop database and close connection
    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        mongoose.connection.close(done);
      });
    });
  });
});
