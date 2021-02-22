const express = require("express");
const router = express.Router();
const { transactions, account } = require("../data");

router.get("/", (req, res) => {
  return res.status(200).json(transactions);
});

router.get("/:id", (req, res) => {
  const found = transactions.find((e) => e.id == req.params.id);
  if (found) return res.status(200).json(found);
  else return res.status(404).json("Transaction not found");
});

router.post("/", async (req, res) => {
  const { type, amount } = req.body;
  console.log(req.body);
  if (!type || !amount) return res.status(400).json("All params are mandatory");

  try {
    // Simulation of the concurrent access to data
    await processTransaction();
  } catch (err) {
    return res.status(500).json(err);
  }
  if (type === "debit") account.locked = true;
  if (type === "debit" && account.value - amount < 0) {
    account.locked = false;
    return res
      .status(400)
      .json("The requested account cannot fulfil the requested transaction");
  }
  if (type === "debit") account.value -= amount;
  if (type === "credit") account.value += amount;
  account.locked = false;
  const transaction = {
    id: transactions.length,
    type,
    amount,
    effectiveDate: Date.now(),
  };
  transactions.push(transaction);
  return res.status(201).json(transaction);
});

// This is just a simulation of how to handle a concurrent race condition
const processTransaction = async () => {
  let count = 0;
  return new Promise((resolve, reject) => {
    (function wait() {
      if (++count > 5) return reject("Resource not freed");
      if (!account.locked) return resolve();
      console.log("Waiting for account to be freed");
      setTimeout(wait, 1000);
    })();
  });
};

module.exports = router;
