/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 14 2020 23:50:11 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const mongoose = require("mongoose");

// const opts = {
//   toJSON: {
//     virtuals: true,
//   },
//   toObject: {
//     virtuals: true,
//   },
//   timestamps: false,
// };

const ExampleSchema = new mongoose.Schema(
  {
    key: { type: String, trim: true },
    type: { type: String, trim: true },
    isSold: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: false },
    dateCreated: { type: String, default: new Date().toISOString() },
    dateSold: { type: String, default: "" },
  }
  // opts
);

module.exports = mongoose.model("Example", ExampleSchema);
