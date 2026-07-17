const express = require("express");

const {
  saveReflection,
  getAllReflections,
  deleteReflection
} = require("../controllers/reflectionController");

const router = express.Router();

router.post("/", saveReflection);
router.get("/", getAllReflections);
router.delete("/:date", deleteReflection);

module.exports = router;