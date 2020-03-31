const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Hel = require("../../models/Hel");
const Student = require("../../models/Student");

const loggedIn = require("../../middleware/auth");

router.post(
  "/submit",
  [
    loggedIn,
    check("slotNumber", "Slot is required")
      .not()
      .isEmpty(),
    check("humanitiesElectives").isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { slotNumber, humanitiesElectives } = req.body;
    try {
      for (const elec of humanitiesElectives) {
        let elective = elec.toLowerCase().split(" ");
        elective = elective[0] + " " + elective[1];
        let hel = await Hel.findOne({ courseName: elective });
        if (!hel) {
          hel = new Hel({
            courseName: elective,
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
          hel.save();
        }

        const slotNo = slotNumber.toString(10);
        const courseSlots = hel.studentsInterestedInSlot;
        const studentsInterestedInSlot = courseSlots.get(slotNo);
        courseSlots.set(slotNo, studentsInterestedInSlot + 1);
        await Hel.updateOne(
          { courseName: elective },
          { studentsInterestedInSlot: courseSlots }
        );
      }
      res.status(201).json({ msg: "Submitted!" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/firstlogin",
  [
    loggedIn,
    [
      check("email", "Email is required")
        .not()
        .isEmpty(),
      check("email", "Invalid email").isEmail(),
      check("studentBranch", "Invalid branch type").isArray(),
      check("studentBranch", "Branch is required")
        .not()
        .isEmpty(),
      check("year", "Year is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, studentBranch, year } = req.body;
    try {
      await Student.updateOne(
        { email: email },
        { submittedForm: true, branch: studentBranch, year: year }
      );
      res.status(201).json({ msg: "Updated in db!" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
