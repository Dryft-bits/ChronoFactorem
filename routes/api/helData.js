const mongoose = require("mongoose");
const express = require("express");
const Hel = require("../../models/Hel");
const router = express.Router();

router.get("/searchHEL/:courseName", async (req, res) => {
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
});

module.exports = router;
