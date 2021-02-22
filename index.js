const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const transactions = require("./routes/transactions");
const accounts = require("./routes/accounts");
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/****************** Endpoints ******************/
app.use("/transactions", [transactions]);
app.use("/accounts", [accounts]);
