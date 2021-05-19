const Express = require("express");
const fileUpload = require('express-fileupload');
const app = Express();

app.use(Express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let csv_train_file;
  let csv_anomaly_file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  csv_train_file = req.files.csv_train_file;
  csv_anomaly_file = req.files.csv_anomaly_file;
  trainUploadPath = __dirname + '/tmp/' + "train.csv";
  anomalyUploadPath = __dirname + '/tmp/' + "anomaly.csv";

  // Use the mv() method to place the file somewhere on your server
  csv_train_file.mv(trainUploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

  });
   csv_anomaly_file.mv(anomalyUploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

  });
   res.sendFile(__dirname +'/index.html');
});

app.post('/upload-anomaly', function(req, res) {
  let csv_file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  csv_file = req.files.csv_file;
  uploadPath = __dirname + '/tmp/' + "anoamly.csv"

  // Use the mv() method to place the file somewhere on your server
  csv_file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send("/");
  });
});

app.listen(8080, () =>  console.log("listening on port 8080"));