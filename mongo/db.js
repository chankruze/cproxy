/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 14 2020 23:48:55 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const utils = require("../utils"),
  mongoose = require("mongoose");

const connectMongoDB = async () => {
  const MONGO_ATLAS_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USER_NAME}:${process.enV.MONGODB_ATLAS_USER_PASS}@cluster0.041rz.mongodb.net/${process.env.MONGODB_ATLAS_DB_NAME}?retryWrites=true&w=majority`;

  try {
    mongoose.Promise = global.Promise;

    await mongoose.connect(MONGO_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`[I] MongoDB connected`);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
