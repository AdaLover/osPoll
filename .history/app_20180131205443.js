const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const poll = require("./routes/poll");

const app = express();

app.use(express.static("public"));

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors middleware
app.use(cors());
//
app.use();
const port = 4000;
app.listen(port, () => {
  console.log("hey");
});
