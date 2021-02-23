const express = require("express");
const { PORT } = require("./configs");
var bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
const transactions = require("./routes/transactions");
const accounts = require("./routes/accounts");

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Acc system listening on port ${PORT}!`));

/****************** Endpoints ******************/
app.use("/transactions", [transactions]);
app.use("/accounts", [accounts]);
