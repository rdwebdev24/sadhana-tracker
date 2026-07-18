const DailyGoal = require("../model/dailyGoalModel");

const saveDailyGoals = async (req, res) => {
  try {
    const { date, goals, score } = req.body;

    const savedGoals = await DailyGoal.findOneAndUpdate(
      { date },
      {
        date,
        goals,
        score,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: savedGoals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDailyGoals = async (req, res) => {
  try {
    const dailyGoals = await DailyGoal.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: dailyGoals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveDailyGoals,
  getDailyGoals,
};