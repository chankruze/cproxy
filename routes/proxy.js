/*
Author: chankruze (chankruze@geekofia.in)
Created: Fri Nov 27 2020 04:43:03 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

// https://www.restapitutorial.com/httpstatuscodes.html

const router = require("express").Router(),
  utils = require("../utils"),
  path = require("path");

router.get("/", async (req, res) => {
  res.status(200).send("Documentation");
});

router.post("/encode", async (req, res) => {
  // if API key don't matches (or not found in the DB [prod])
  // return unauthorized status
  if (req.headers["x-cproxy-api-key"] !== process.env.API_KEY) {
    return res.status(401).json(
      utils.prepareResponse("failed", null, {
        msg: "request unauthorized",
      })
    );
  }

  // if content-type is not json
  // return bad request status
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json(
      utils.prepareResponse("failed", null, {
        msg: "only json data allowed",
      })
    );
  }

  // authorized & proceed proxying
  const { url, timestamp } = req.body;

  try {
    // stuffs to create proxied url
    const splittedUrl = url.split("/");
    const filePath = path.resolve(
      __dirname,
      "./",
      `${splittedUrl[splittedUrl.length - 1]}.torrent`
    );
    await utils.downloadFile(url, filePath);

    return res.status(200).json(
      utils.prepareResponse("success", {
        downloadUrl: filePath,
      })
    );

    // shorten the encoded url
    // encodedUrl = `${req.headers.host}/${file}`;
  } catch (err) {
    console.log(err);
    return res.status(500).json(
      utils.prepareResponse("failed", null, {
        msg: "unable to encode requested url",
      })
    );
  }
});

module.exports = router;
