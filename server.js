import express from "express";
import connectDB from "./config/db.js";

import authRoute from "./routes/api/auth.js";
import staffRoute from "./routes/api/staff.js";
import studentRoute from "./routes/api/student.js";
import googleRoute from "./routes/api/google.js";

const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoute);
app.use("/api/student", studentRoute);
app.use("/api/google", googleRoute);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
