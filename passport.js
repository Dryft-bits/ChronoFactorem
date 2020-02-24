const mongoose = require("mongoose");
const User = mongoose.model("users");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const config = require("config");
const GOOGLE_CLIENT_ID = config.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = config.get("GOOGLE_CLIENT_SECRET");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://chronofactorem.herokuapp.com/api/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
