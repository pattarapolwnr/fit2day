const authorization = require("../utils/authorization");
const express = require("express");
const WorkoutHistory = require("../models/workout_history");
const DietHistory = require("../models/diet_history");
const router = express.Router();
const moment = require("moment");
const User = require("../models/user");

router.post("/workout", authorization, async (req, res) => {
  const user_id = req.user_id;
  const { plan_name, duration, exercises, points } = req.body.data;
  try {
    const newWorkoutHistory = new WorkoutHistory({
      user_id: user_id,
      date: moment().format("L"),
      plan_name: plan_name,
      duration: duration,
      exercises: exercises,
    });
    await newWorkoutHistory.save();
    const user = await User.findByIdAndUpdate(user_id, {
      $inc: { points: points },
    });
    return res
      .status(200)
      .json({ message: "Create workout history successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data not found!" });
  }
});

router.get("/workout", authorization, async (req, res) => {
  const user_id = req.user_id;
  const obj_id = req.query.id;
  // Get one workout history
  if (obj_id) {
    try {
      const workout = await WorkoutHistory.findById(obj_id);
      return res.status(200).json(workout);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "Data not found!" });
    }
  }
  // Get all workout history
  try {
    const workout = await WorkoutHistory.find({
      user_id: user_id,
    }).sort({ createdAt: -1 });
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data not found!" });
  }
});

router.put("/diet", authorization, async (req, res) => {
  const user_id = req.user_id;
  const { totalCalories, breakfast, lunch, dinner } = req.body.data;
  try {
    const update = await DietHistory.findOneAndUpdate(
      { user_id: user_id, date: moment().format("L") },
      {
        user_id: user_id,
        date: moment().format("L"),
        total_calories: totalCalories,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
      },
      { new: true, upsert: true }
    );
    return res
      .status(200)
      .json({ message: "Create/Update Diet history successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Cannot create/update diet history!" });
  }
});

router.get("/diet", authorization, async (req, res) => {
  const user_id = req.user_id;
  try {
    const diet = await DietHistory.find({
      user_id: user_id,
    }).sort({ createdAt: -1 });
    return res.status(200).json(diet);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data not found!" });
  }
});

router.get("/diet/current", authorization, async (req, res) => {
  const user_id = req.user_id;
  try {
    const diet = await DietHistory.findOne({
      user_id: user_id,
      date: moment().format("L"),
    });
    return res.status(200).json(diet);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data not found!" });
  }
});

router.get("/diet/detail", authorization, async (req, res) => {
  const obj_id = req.query.id;
  try {
    const diet = await DietHistory.findById(obj_id);
    return res.status(200).json(diet);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data not found!" });
  }
});

module.exports = router;
