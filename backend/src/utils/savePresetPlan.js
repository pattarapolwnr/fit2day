const Plan = require("../models/plan");
const presetPlanData = require("./presetPlanData");

const savePresetPlan = async (user_id, selected_plan) => {
  switch (selected_plan) {
    case "fullbody":
      const update = await Plan.findOneAndUpdate(
        { user_id: user_id },
        {
          sunday: { plan_name: "Rest", exercises: [] },
          monday: {
            plan_name: "Full Body Workout",
            exercises: presetPlanData.fullbody.monday,
          },
          tuesday: { plan_name: "Rest", exercises: [] },
          wednesday: {
            plan_name: "Full Body Workout",
            exercises: presetPlanData.fullbody.wednesday,
          },
          thursday: { plan_name: "Rest", exercises: [] },
          friday: {
            plan_name: "Full Body Workout",
            exercises: presetPlanData.fullbody.friday,
          },
          saturday: { plan_name: "Rest", exercises: [] },
        },
        { new: true, upsert: true }
      );
      return;
    case "push-pull-leg":
      const update2 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        {
          sunday: { plan_name: "Rest", exercises: [] },
          monday: {
            plan_name: "Push Day",
            exercises: presetPlanData.push_pull_leg.monday,
          },
          tuesday: { plan_name: "Rest", exercises: [] },
          wednesday: {
            plan_name: "Pull Day",
            exercises: presetPlanData.push_pull_leg.wednesday,
          },
          thursday: { plan_name: "Rest", exercises: [] },
          friday: {
            plan_name: "Leg Day",
            exercises: presetPlanData.push_pull_leg.friday,
          },
          saturday: { plan_name: "Rest", exercises: [] },
        },
        { new: true, upsert: true }
      );
      return;
    case "antagonistic":
      const update3 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        {
          sunday: { plan_name: "Rest", exercises: [] },
          monday: {
            plan_name: "Leg Day",
            exercises: presetPlanData.antagonistic.monday,
          },
          tuesday: {
            plan_name: "Chest and back thickness",
            exercises: presetPlanData.antagonistic.tuesday,
          },
          wednesday: { plan_name: "Rest", exercises: [] },
          thursday: {
            plan_name: "Shoulders and back width",
            exercises: presetPlanData.antagonistic.thursday,
          },
          friday: {
            plan_name: "Triceps and biceps",
            exercises: presetPlanData.antagonistic.friday,
          },
          saturday: { plan_name: "Rest", exercises: [] },
        },
        { new: true, upsert: true }
      );
      return;

    case "upper-lower":
      const update4 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        {
          sunday: { plan_name: "Rest", exercises: [] },
          monday: {
            plan_name: "Upper Body Day",
            exercises: presetPlanData.upper_lower.monday,
          },
          tuesday: {
            plan_name: "Lower Body Day",
            exercises: presetPlanData.upper_lower.tuesday,
          },
          wednesday: { plan_name: "Rest", exercises: [] },
          thursday: {
            plan_name: "Upper Body Day",
            exercises: presetPlanData.upper_lower.thursday,
          },
          friday: {
            plan_name: "Lower Body Day",
            exercises: presetPlanData.upper_lower.friday,
          },
          saturday: { plan_name: "Rest", exercises: [] },
        },
        { new: true, upsert: true }
      );
      return;
  }
};

module.exports = savePresetPlan;
