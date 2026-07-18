const express = require("express");
const router = express.Router();

const {
  saveDailyGoals,
  getDailyGoals,
} = require("../controllers/dailyGoalController");

router.post("/", saveDailyGoals);
router.get("/", getDailyGoals);

module.exports = router;  