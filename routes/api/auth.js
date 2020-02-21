import passport from "passport";
import express from "express";
const authRouter = express.Router();

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000/student");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

authRouter.get("/current_user", (req, res) => {
  res.send(req.session._ctx.user.name);
});

export default authRouter;
