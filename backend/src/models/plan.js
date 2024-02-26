const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    sunday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
    monday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
    tuesday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
    wednesday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
    thursday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
    friday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
    saturday: {
      plan_name: String,
      exercises: [
        {
          id: String,
          exercise_name: String,
          weight: String,
          sets: Number,
          reps: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
