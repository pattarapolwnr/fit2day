const authorization = require("../utils/authorization");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", authorization, async (req, res, next) => {
  const user_id = req.user_id;
  const user = await User.findById(user_id);
  const response_data = {
    user_id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    objective: user.objective,
    age: user.age,
    weight: user.weight,
    height: user.height,
    objective: user.objective,
    img: user.img,
  };
  return res.status(200).json(response_data);
});

router.put("/", authorization, async (req, res, next) => {
  const user_id = req.user_id;
  const { data, image } = req.body.data;
  const { firstname, lastname, age, height, weight, objective } = data;
  try {
    const update = await User.findOneAndUpdate(
      { _id: user_id },
      {
        firstname: firstname,
        lastname: lastname,
        age: age,
        height: height,
        weight: weight,
        objective: objective,
        img: image,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ message: "Successfully update!" });
});

module.exports = router;
