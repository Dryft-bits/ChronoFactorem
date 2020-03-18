const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Hel = require("../../models/Hel");
const Student = require("../../models/Student");

router.post(
  "/submit",
  [
    check("slotNumber", "Slot is required")
      .not()
      .isEmpty(),
    check("humanitiesElectives").isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { slotNumber, humanitiesElectives } = req.body;
    try {
      for (const elective of humanitiesElectives) {
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
      res.json({ msg: "Submitted!" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/firstlogin", [], async (req, res) => {
  const { email } = req.body;
  try {
    await Student.updateOne({ email: email }, { submittedForm: true });
    res.json({ msg: "Updated in db!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
