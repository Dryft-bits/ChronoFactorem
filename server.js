const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const path = require("path");

const auth = require("./routes/api/auth.js");

const configuration = require("./config/constants.js");

/* Express setup */
const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Connect to database */
const Student = require("./models/Student.js");
connectDB();
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [configuration.cookieKey]
  })
);

/* Passport stuff */
const passportJS = require("./passport.js");
app.use(passport.initialize());
app.use(passport.session({ saveUninitialized: false, resave: false }));

/* Define Routes */
app.use("/", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
