const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let votes = mongoose.model("votes");
var Pusher = require("pusher");

var pusher = new Pusher({
	appId: "465327",
	key: "703fa550868412e2092a",
	secret: "39f36a46f5480843d1ec",
	cluster: "ap2",
	encrypted: true
});

router.get("/", async (req, res) => {
	let allVotes = await votes.find();
	res.send({ success: true, votes: allVotes });
});

router.post("/", async (req, res) => {
	let newVote = new votes({
		os: req.body.os,
		points: 1
	});
	let vote = await newVote.save();
	pusher.trigger("osPoll", "osVote", {
		points: parseInt(vote.points),
		os: vote.os
	});
	return res.json({ success: true, message: "vote successful" });
});
module.exports = router;
