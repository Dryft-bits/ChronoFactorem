const configuration = require("../../config/constants.js");

const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const express = require("express");
const authRouter = express.Router();

const loggedIn = require("../../middleware/auth");

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

authRouter.get("/loggedin", loggedIn, function(req, res) {
  res.status(200).send(req.user);
});

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect(configuration.urls.homePage);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.clearCookie();
  res.json({ msg: "Logged out" });
});

authRouter.get("/current_user", loggedIn, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = authRouter;
