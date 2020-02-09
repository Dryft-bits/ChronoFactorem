import express from "express";
import connectDB from "./config/db";

const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
