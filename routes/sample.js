/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 14 2020 23:51:19 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const router = require("express").Router(),
  Example = require("../mongo/models/ExampleSchema");

// public /example
router.get("/examples", async (req, res) => {
  await Example.find({}, (err, data) => {
    res.json(data);
  });
});

router.get("/test", async (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
