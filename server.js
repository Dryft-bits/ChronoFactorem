import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import auth from "./routes/api/auth.js";

import Student from "./models/Student.js";

const app = express();

const PORT = process.env.port || 5000;
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to database
connectDB();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["ilovemytimetable"]
  })
);

// Passport stuff
app.use(passport.initialize());
app.use(passport.session());
import passportJS from "./passport.js";

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api", auth);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
