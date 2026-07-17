const mongoose = require("mongoose");

const sadhanaSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      default: "",
    },

    rounds: {
      type: Number,
      default: 0,
    },

    reading: {
      type: Number,
      default: 0,
    },

    hearing: {
      type: Number,
      default: 0,
    },

    wakeTime: {
      type: String,
      default: "",
    },

    sleepTime: {
      type: String,
      default: "",
    },

    Rounds_finish_before: {
      type: String,
      default: "",
    },

    Seva: {
      type: String,
      default: "",
    },

    reflection: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sadhana", sadhanaSchema);