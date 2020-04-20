const express = require("express");
const router = express.Router();
const { check, query, validationResult } = require("express-validator");
const loggedIn = require("../../middleware/auth");
const TimeTable = require("../../models/TimeTable");
const Student = require("../../models/Student");
const Login = require("../../models/Login");

const mscBranches = ["BIO", "CHEM", "ECO", "MATH", "PHY"];

router.get("/", [], async (req, res) => {
  try {
    let nLogins = await Login.countDocuments();
    let userLogins = await Login.find({}, "-_id -__v");
    let nUniqueLogins = (await Login.find().distinct("userId")).length;
    let timetablesCreated = await TimeTable.find({}, "date").populate(
      "ownerId",
      "-_id branch year"
    );
    timetablesCreated = timetablesCreated.map(function (tt) {
      // null check
      if (tt.ownerId) {
        let branches = tt.ownerId.branch;

        if (branches.length == 2) {
          if (mscBranches.includes(branches[0])) {
            tt.ownerId.branch = [branches[0]];
          } else if (mscBranches.includes(branches[1])) {
            tt.ownerId.branch = [branches[1]];
          } else {
            tt.ownerId.branch = [branches[0]];
          }
        }
      }
      return tt;
    });

    res.status(200).json({
      nLogins: nLogins,
      nUniqueLogin: nUniqueLogins,
      userLogins: userLogins,
      timetablesCreated: timetablesCreated
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
