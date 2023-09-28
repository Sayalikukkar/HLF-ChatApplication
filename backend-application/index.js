/* eslint-disable eqeqeq */
"use strict";

//get libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//create express web-app

const app = express();
const invoke = require("./invoke");
dotenv.config();

app.use(cors());
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, welcome to my page");
});

//Declare Port
const PORT = process.env.PORT || 1000;
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//-------------------------------------------------------------
//----------------------  POST API'S    -----------------------
//-------------------------------------------------------------

app.post("/api/register", async function (req, res) {
  let request = {
    chaincodeId: "chat",
    fcn: "register",
    userId: req.body.userId,
    userName: req.body.userName,
    accessKey: req.body.accessKey,
  };

  console.log(req.body);
  let response = await invoke.register(request);
  if (response) {
    if (response.status == 200) {
      res
        .status(response.status)
        .send({ message: "user registration is successful" });
    } else {
      res.status(response.status).send({ message: response.message });
    }
  }
});

app.post("/api/sendMessage", async function (req, res) {
  let request = {
    chaincodeId: "chat",
    fcn: "sendMessage",

    userId: req.body.userId,
    accessKey: req.body.accessKey,
    recipient: req.body.recipient,
    message: req.body.message,
  };

  console.log(req.body);
  let response = await invoke.register(request);
  if (response) {
    if (response.status == 200) {
      res.status(response.status).send({ message: "Messsage send successful" });
    } else {
      res.status(response.status).send({ message: response.message });
    }
  }
});
