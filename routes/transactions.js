const express = require("express");
const router = express.Router();
const { transactions } = require("../data");

router.get("/", (req, res) => {
  return res.status(200).json(transactions);
});

module.exports = router;
