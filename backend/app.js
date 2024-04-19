const cors = require("cors");
const express = require("express");
// const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
// const session = require('express-session');
// const bcrypt = require('bcrypt');
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const planRoutes = require("./src/routes/plan");
const historyRoutes = require("./src/routes/history");
const rankingRoutes = require("./src/routes/ranking");
const profileRoutes = require("./src/routes/profile");
const mongoose = require("mongoose");
const { config } = require("./config/config");

const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://fit2day.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Use authentication routes
app.use("/auth", authRoutes);

// Use user routes
app.use("/user", userRoutes);

// Use workout plan routes
app.use("/plan", planRoutes);

// Use workout plan routes
app.use("/history", historyRoutes);

// User ranking routes
app.use("/ranking", rankingRoutes);

// User profile routes
app.use("/profile", profileRoutes);

const port = 443;

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
