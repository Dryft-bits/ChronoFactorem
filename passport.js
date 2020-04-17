const configuration = require("./config/constants.js");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Student = mongoose.model("student");
const Login = mongoose.model("login");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Student.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: configuration.urls.googleAuthCallback
    },
    (accessToken, refreshToken, profile, done) => {
      Student.findOne({ email: profile.emails[0].value }).then(
        (existingUser) => {
          if (existingUser) {
            new Login({
              userId: existingUser._id
            }).save();
            done(null, existingUser);
          } else {
            new Student({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              submittedForm: false,
              branch: [],
              year: 0
            })
              .save()
              .then((user) => {
                new Login({
                  userId: user._id
                }).save();
                done(null, user);
              });
          }
        }
      );
    }
  )
);
