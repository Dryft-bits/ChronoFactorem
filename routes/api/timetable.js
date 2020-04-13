const express = require("express");
const router = express.Router();
const { check, query, validationResult } = require("express-validator");
const loggedIn = require("../../middleware/auth");
const TimeTable = require("../../models/TimeTable");

router.post(
  "/save",
  [loggedIn, check("timetable").exists(), check("courses").isArray()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { id, name, timetable, courses } = req.body;
    try {
      let tt = await TimeTable.findOne({ _id: id, ownerId: req.user.id });
      if (!tt) {
        tt = new TimeTable({
          ownerId: req.user.id,
          name: name,
          TimeTable: timetable,
          Courses: courses
        });
      } else {
        tt.name = name;
        tt.TimeTable = timetable;
        tt.Courses = courses;
      }
      tt.save();
      res.status(200).json({ id: tt.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/getTT", loggedIn, async (req, res) => {
  try {
    let tt = await TimeTable.find({ ownerId: req.user.id }).sort({
      date: -1
    });
    res.status(200).json(tt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:id", loggedIn, async (req, res) => {
  try {
    const tt = await TimeTable.findOne({
      _id: req.params.id,
      ownerId: req.user.id
    });
    if (!tt) throw Error("TimeTable not found");

    const removed = await tt.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the TimeTable");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, success: false });
  }
});

router.get("/toggleShare/:id", loggedIn, async (req, res) => {
  try {
    const tt = await TimeTable.findOne({
      _id: req.params.id,
      ownerId: req.user.id
    });
    if (!tt) throw Error("TimeTable not found");
    tt.isShared = !tt.isShared;
    tt.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get(
  "/viewshared",
  [
    loggedIn,
    query("branch").isArray(),
    query("year")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      try {
        await TimeTable.find({ isShared: true, ownerId: {$not: { $eq: req.user.id}} })
          .populate({
            path: "ownerId",
            match: { branch:  req.query.branch, year: req.query.year },
            select: "name"
          })
          .exec((error, docs) => {
            if (error) {
              res.status(500).send(err);
            } else {
              let TTList = [];
              for (let TT of docs) {
                if(TT.ownerId !== null)
                  TTList.push(TT);
              }
              res.json(TTList);
            }
          });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }
);

module.exports = router;
