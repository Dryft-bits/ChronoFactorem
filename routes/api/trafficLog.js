const express = require("express");
const router = express.Router();
const { check, query, validationResult } = require("express-validator");
const loggedIn = require("../../middleware/auth");
const Login = require("../../models/Login");

router.post(
  "logs/login",
  [loggedIn, check("id").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }
    const { id } = req.body;
    try {
      newLogin = new Login({
        userId: id
      });
      newLogin.save();
      res.status(201).json({ msg: "Login logged" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
