const Express = require("express");
const fileUpload = require("express-fileupload");
const app = Express();

app.use(Express.static(__dirname + "/public"));
app.use(Express.static(__dirname + "/view"));
app.use(Express.static(__dirname + "/model"));

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

app.post("/detect", function (req, res) {
  //detect anomalys
  res.send(JSON.stringify("Detection complete."));
});
app.listen(8080, () => console.log("listening on port 8080"));
