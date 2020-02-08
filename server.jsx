const express = require("express");
const connectDB = require("./config/db.jsx");

const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
