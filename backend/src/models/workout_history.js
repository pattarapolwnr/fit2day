const mongoose = require("mongoose");

const workoutHistorySchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    date: { type: String, required: true },
    plan_name: { type: String, required: true },
    duration: { type: String, required: true },
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
  { timestamps: true }
);

const WorkoutHistory = mongoose.model("Workout History", workoutHistorySchema);

module.exports = WorkoutHistory;
