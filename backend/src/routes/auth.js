const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/jwtToken");

router.post("/register", async (req, res) => {
  try {
    const { username, password, firstname, lastname, email } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "The email is already used." });
    }
    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      email,
    });
    await newUser.save();

    // const token = generateToken(newUser._id);
    return res.status(200).json({ message: "Successfully register!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    return res
      .cookie("token", token, {
        maxAge: 300000,
        // secure: true,
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
