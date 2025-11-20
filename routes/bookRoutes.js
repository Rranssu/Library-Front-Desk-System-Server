const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/search", bookController.searchBooks);

module.exports = router;
