require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json());
app.use("/api/v1/user", require('./Api/Auth'));
// app.use("/api/v1/product", require('./Api/product'))
module.exports = app;