import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import auth from "./routes/api/auth.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.port || 5000;
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to database
import Student from "./models/Student.js";
connectDB();

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: ["ilovemytimetable"]
  })
);

// Passport stuff
import passportJS from "./passport.js";
app.use(passport.initialize());
app.use(passport.session({ saveUninitialized: false, resave: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/", auth);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
