const express = require("express");

const {
    saveSadhana,
    getAllSadhana
} = require("../controllers/Sadhanacontrollers");
    

const router = express.Router();

// Save or Update Sadhana
router.post("/", saveSadhana);
router.get("/", getAllSadhana);

module.exports = router;