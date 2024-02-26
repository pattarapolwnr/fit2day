const authorization = require("../utils/authorization");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", authorization, async (req, res, next) => {
  const user_id = req.user_id;
  const user = await User.find().sort({ points: -1 });
  return res.status(200).json(user);
});

module.exports = router;
