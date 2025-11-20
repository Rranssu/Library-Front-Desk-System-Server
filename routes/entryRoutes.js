const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");


router.post("/log", entryController.logEntry);

module.exports = router;
