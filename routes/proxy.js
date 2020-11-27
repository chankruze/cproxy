/*
Author: chankruze (chankruze@geekofia.in)
Created: Fri Nov 27 2020 04:43:03 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

// https://www.restapitutorial.com/httpstatuscodes.html

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send("Documentation");
});

router.post("/encode", async (req, res) => {
  // if API key don't matches (or not found in the DB [prod])
  // return unauthorized status
  if (req.headers["x-cproxy-api-key"] !== process.env.API_KEY) {
    return res.status(401).json({ status: "failed" });
  }

  // authorized & proceed proxying
  const { url, timestamp } = req.body;
  let encodedUrl = "";

  try {
    // stuffs to create proxied url

    // shorten the encoded url
    encodedUrl = `${req.headers.host}:${url}`;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: {
        msg: "unable to encode requested url",
        reason: err.toString().split(".")[0],
      },
    });
  }

  res.status(200).json({ status: "ok", url, encodedUrl });
});

module.exports = router;
