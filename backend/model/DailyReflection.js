const mongoose = require("mongoose");

const dailyReflectionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true
    },

    inspired: {
      type: String,
      default: ""
    },

    learned: {
      type: String,
      default: ""
    },

    improve: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      default: ""
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);


module.exports = mongoose.model("DailyReflection", dailyReflectionSchema);