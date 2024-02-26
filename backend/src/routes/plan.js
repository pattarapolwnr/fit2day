const authorization = require("../utils/authorization");
const express = require("express");
const updatePlanOnDay = require("../utils/planUpdateOnDay");
const Plan = require("../models/plan");
const savePresetPlan = require("../utils/savePresetPlan");
const router = express.Router();

router.get("/", authorization, async (req, res) => {
  const user_id = req.user_id;
  try {
    const plan = await Plan.findOne({ user_id: user_id });
    return res.status(200).json(plan);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data not found!" });
  }
});

router.post("/preset", authorization, async (req, res) => {
  const user_id = req.user_id;
  const { selected_plan } = req.body.data;
  try {
    const save = await savePresetPlan(user_id, selected_plan);
    return res
      .status(200)
      .json({ message: "Save a preset plan successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Cannot save the data!" });
  }
});

router.put("/edit", authorization, async (req, res) => {
  const user_id = req.user_id;
  const { day, plan_name, exercises } = req.body.data;
  try {
    const update = await updatePlanOnDay(user_id, day, plan_name, exercises);
    return res.status(200).json({ message: "Update successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Cannot update the data!" });
  }
});

module.exports = router;
