const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//app.use(express.static(path.join(__dirname + "public")));

//body parser middleware

//app.use(bodyParser.json);
//app.use(bodyParser.urlEncoded({ extended: false }));

//cors middleware
app.get("/", (req, res) => {
  console.log("call");
  res.send("jnjk");
});
//
const port = 4000;
app.listen(port, () => {
  console.log("hey");
});
