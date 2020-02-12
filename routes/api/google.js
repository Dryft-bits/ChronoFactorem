import express from "express";
const router = express.Router();

// @route   GET api/staff
// @desc    Google route
// @access  Public
router.get("/", (req, res) => res.send("Google auth route"));

export default router;
