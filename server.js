const addon = require("./build/Release/AnomalyModule");
const fileUpload = require("express-fileupload");
const express = require("express");
const fs = require("fs");
const csvParseToMap = require("./utils");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/controller"));
app.use(express.static(__dirname + "/model"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// default options
app.use(fileUpload());

app.post("/uploadTraining", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const csv_train_file = req.files.csv_train_file;
  const trainUploadPath = __dirname + "/tmp/" + "train.csv";
  csv_train_file.mv(trainUploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });
  res.send(JSON.stringify("Training file uploaded"));
  res.end();
});

app.post("/uploadAnomaly", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const csv_anomaly_file = req.files.csv_anomaly_file;
  const anomalyUploadPath = __dirname + "/tmp/" + "anomaly.csv";

  csv_anomaly_file.mv(anomalyUploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });
  res.send(JSON.stringify("Anomaly file uploaded"));
  res.end();
});

function linearDetect() {
  console.log("execute 'linearDetect' funct	ion");
  const vecReport = addon.linearDetect(
    __dirname + "/tmp/train.csv",
    __dirname + "/tmp/anomaly.csv"
  );
  return vecReport;
}

function circleDetect() {
  console.log("execute 'circleDetect' funct	ion");
  const vecReport = addon.circleDetect(
    __dirname + "/tmp/train.csv",
    __dirname + "/tmp/anomaly.csv"
  );
  return vecReport;
}

app.post("/detectLinear", function (req, res) {
  //detect anomalys
  console.log("Detecting using linear regression");
  var vecReportString = JSON.stringify(linearDetect(), null, 2);
  fs.writeFile(
    __dirname + "/tmp/AnomalyReport.json",
    vecReportString,
    (err, result) => {
      if (err) console.log("error", err);
      else {
        let ret = fs.readFileSync(__dirname + "/tmp/AnomalyReport.json");
        let jdata = JSON.parse(ret);
        res.send(JSON.stringify(jdata));
        res.end();
      }
    }
  );
});

app.post("/detectHybrid", function (req, res) {
  //detect anomalys
  console.log("Detecting using Hybrid algorithm");
  var vecReportString = JSON.stringify(circleDetect(), null, 2); //Change this to min circle Detect ask ilan

  fs.writeFile(
    __dirname + "/tmp/AnomalyReport.json",
    vecReportString,
    (err, result) => {
      if (err) console.log("error", err);
      else {
        let ret = fs.readFileSync(__dirname + "/tmp/AnomalyReport.json");
        let jdata = JSON.parse(ret);
        res.send(JSON.stringify(jdata));
        res.end();
      }
    }
  );
});

app.post("/csvdata", (req, res) => {
  map = csvParseToMap.csvToMap(__dirname + "/tmp/anomaly.csv");
  const data = req.body.header;
  res.send(JSON.stringify(map.get(data)));
  res.end();
});

app.listen(8080, () => console.log("listening on port 8080"));
