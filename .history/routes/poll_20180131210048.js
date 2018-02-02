const express = require("express");
const router = express.Router();

var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "465327",
  key: "703fa550868412e2092a",
  secret: "39f36a46f5480843d1ec",
  cluster: "ap2",
  encrypted: true
});

router.get("/", (req, res) => {
  res.send("poll");
});

router.post("/", (req, res) => {
  pusher.trigger("osPoll", "osVote", {
    points: 1,
    os: req.body.os
  });
  return res.json({ success: true, message: "vote successful" });
});
module.exports = router;
