/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 14 2020 23:44:33 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const axios = require("axios"),
  fs = require("fs");

const isDevEnv = () => {
  return process.env.NODE_ENV !== "production";
};

const isEmpty = (str) => {
  return !str || 0 === str.length;
};

const isBlank = (str) => {
  return !str || /^\s*$/.test(str);
};

const prepareResponse = (status, data, error) => {
  const response = { status };

  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  return response;
};

const downloadFile = async (fileUrl, outputLocationPath) => {
  const writer = fs.createWriteStream(outputLocationPath);

  return axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  }).then((response) => {
    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on("close", () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
};

module.exports = Object.freeze({
  isDevEnv,
  isEmpty,
  isBlank,
  prepareResponse,
  downloadFile,
});
