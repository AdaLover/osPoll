const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://raja:ospoll123@ds121898.mlab.com:21898/ospoll");
require("./models/votes");
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
app.use("/poll", poll);
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("connected to server @ 4000");
});
