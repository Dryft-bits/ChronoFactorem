import express from "express";
import connectDB from "./config/db.js";

import auth from "./routes/api/auth.js";

const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", auth);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
