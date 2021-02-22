const express = require("express");
const router = express.Router();
const { account } = require("../data");

router.get("/", (req, res) => {
  return res.status(200).json(account);
});

module.exports = router;
