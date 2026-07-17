const DailyReflection = require("../model/DailyReflection.js");

const saveReflection = async (req, res) => {
  try {
    const reflection =
      await DailyReflection.findOneAndUpdate(
        { date: req.body.date },
        req.body,
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );

    res.json({
      success: true,
      data: reflection
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


const getAllReflections = async (req, res) => {
  try {
    const reflections =
      await DailyReflection.find().sort({ date: -1 });

    res.json({
      success: true,
      count: reflections.length,
      data: reflections
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const deleteReflection = async (req, res) => {
  try {
    const { date } = req.params;

    await DailyReflection.findOneAndDelete({ date });

    res.status(200).json({
      success: true,
      message: "Reflection deleted successfully."
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  saveReflection,
  getAllReflections,
  deleteReflection
};