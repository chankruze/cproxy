/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 14 2020 23:43:28 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const utils = require("./utils");
// check for prod or dev environment
// if dev import dotenv
if (utils.isDevEnv()) {
  require("dotenv").config();
}

const os = require("os"),
  express = require("express"),
  bodyParser = require("body-parser"),
  helmet = require("helmet"),
  cors = require("cors");
//   connectMongoDB = require("./mongo/db"),
//   initSocketIO = require("./socketSetup"),
//   { v4: uuidV4 } = require("uuid"),
//   { nanoid } = require("nanoid");

// create an express app instance
const app = express();
// helmate for security
app.use(helmet());
// CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// parse incoming request bodies
app.use(bodyParser.json());
// connect mongo DB
// connectMongoDB();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("public"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "public", "index.html"));
//   });
// }

// api version
const API_VERSION = "v1";

app.get("/", (req, res) => {
  res.redirect(`/api/${API_VERSION}`);
});

// app.use("/api", require("./routes/sample"));
app.use(`/api/${API_VERSION}/`, require("./routes/proxy"));

// Print sevrer IP
const networkInterfaces = os.networkInterfaces();
let SERV_URL = networkInterfaces.eth0[0].address;

const httpServer = app.listen(process.env.PORT, () => {
  console.log(`Server on network:\thttp://${SERV_URL}:${process.env.PORT}`);
  if (utils.isDevEnv()) {
    console.log(`Server on local:\thttp://localhost:${process.env.PORT}`);
  }
});

// console.log(nanoid());

// init socket.io
// initSocketIO(httpServer);
