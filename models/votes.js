let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let votesSchema = new Schema({
	os: String,
	points: Number
});

const Vote = mongoose.model("votes", votesSchema);
module.exports = Vote;
