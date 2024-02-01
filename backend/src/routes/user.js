const authorization = require("../utils/authorization");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", authorization, async (req, res, next) => {
  const user_id = req.user_id;
  const user = await User.findById(user_id);
  const response_data = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    objective: user.objective,
    img: user.img,
  };
  return res.status(200).json(response_data);
});

module.exports = router;
