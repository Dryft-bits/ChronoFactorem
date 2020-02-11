import express from "express";
const router = express.Router();

// @route   GET api/staff
// @desc    Staff route
// @access  Public
router.get("/", (req, res) => res.send("Staff route"));

export default router;
