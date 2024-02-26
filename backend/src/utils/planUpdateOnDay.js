const Plan = require("../models/plan");

const updatePlanOnDay = async (user_id, day, plan_name, exercises) => {
  if (!exercises) {
    switch (day) {
      case "sunday":
        const update = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { sunday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;
      case "monday":
        const update2 = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { monday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;
      case "tuesday":
        const update3 = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { tuesday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;

      case "wednesday":
        const update4 = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { wednesday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;
      case "thursday":
        const update5 = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { thursday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;
      case "friday":
        const update6 = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { friday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;
      case "saturday":
        const update7 = await Plan.findOneAndUpdate(
          { user_id: user_id },
          { saturday: { plan_name: plan_name, exercises: [] } },
          { new: true, upsert: true }
        );
        return;
    }
  }
  switch (day) {
    case "sunday":
      const update = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { sunday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;
    case "monday":
      const update2 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { monday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;
    case "tuesday":
      const update3 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { tuesday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;

    case "wednesday":
      const update4 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { wednesday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;
    case "thursday":
      const update5 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { thursday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;
    case "friday":
      const update6 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { friday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;
    case "saturday":
      const update7 = await Plan.findOneAndUpdate(
        { user_id: user_id },
        { saturday: { plan_name: plan_name, exercises: exercises } },
        { new: true, upsert: true }
      );
      return;
  }
};

module.exports = updatePlanOnDay;
