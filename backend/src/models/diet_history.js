const mongoose = require("mongoose");

const dietHistorySchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    date: { type: String, required: true },
    total_calories: { type: Number },
    breakfast: [
      {
        id: String,
        eng_name: String,
        calories: Number,
      },
    ],
    lunch: [
      {
        id: String,
        eng_name: String,
        calories: Number,
      },
    ],
    dinner: [
      {
        id: String,
        eng_name: String,
        calories: Number,
      },
    ],
  },
  { timestamps: true }
);

const DietHistory = mongoose.model("Diet History", dietHistorySchema);

module.exports = DietHistory;
