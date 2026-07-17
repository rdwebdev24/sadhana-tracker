const Sadhana = require("../model/Sadhana");

const saveSadhana = async (req, res) => {
  try {

    const {
      date,
      location,
      rounds,
      reading,
      hearing,
      wakeTime,
      sleepTime,
      Rounds_finish_before,
      Seva,
      reflection
    } = req.body;

    const saved = await Sadhana.findOneAndUpdate(
      { date },
      {
        date,
        location,
        rounds,
        reading,
        hearing,
        wakeTime,
        sleepTime,
        Rounds_finish_before,
        Seva,
        reflection
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Sadhana saved successfully.",
      data: saved
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getAllSadhana = async (req, res) => {

    try {

        const data = await Sadhana
            .find()
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    saveSadhana,
    getAllSadhana
};