const {query, validationResult} = require("express-validator");
const express = require("express");
const Hel = require("../../models/Hel");
const router = express.Router();
const loggedIn = require("../../middleware/auth");
router.get("/searchHEL/:courseName", [
  loggedIn
]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    else {
      try {
        const elective = req.params.courseName;
        let courseSlots = "";
        let result = await Hel.findOne({ courseName: elective });
        if (result == null) {
          res.send(null);
        } else {
          courseSlots = result.studentsInterestedInSlot;
          const studentsInterestedInAllSlots = [];
          for (let slotNo of ["0", "1", "2", "3", "4", "5", "6", "7"])
            studentsInterestedInAllSlots.push(courseSlots.get(slotNo));

          res.json({ studentsInterestedInAllSlots });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
      }
    }
  });

module.exports = router;
