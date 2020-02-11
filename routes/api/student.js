import express from "express";
const router = express.Router();

// @route   GET api/student
// @desc    Student route
// @access  Public
router.get("/", (req, res) => res.send("Student route"));

export default router;
