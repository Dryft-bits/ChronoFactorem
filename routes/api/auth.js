const configuration = require("../../config/constants.js");

const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const express = require("express");
const authRouter = express.Router();

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}

authRouter.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

authRouter.get("/loggedin", loggedIn, function(req, res, next) {
  res.send(req.user);
});

authRouter.get(
  "/api/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect(configuration.urls.homePage);
  }
);

authRouter.get("/api/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.clearCookie();
  res.redirect(configuration.urls.homePage);
});

authRouter.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = authRouter;
