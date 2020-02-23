import passport from "passport";
import express from "express";
const authRouter = express.Router();

function loggedIn(req, res, next) {
  // console.log(req);
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
    res.redirect("http://localhost:3000");
  }
);

authRouter.get("/api/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.clearCookie();
  console.log(res);
  console.log(req.session);
  res.redirect("http://localhost:3000");
});

authRouter.get("/current_user", (req, res) => {
  // console.log(req.user);
  res.send(req.user);
});

export default authRouter;
