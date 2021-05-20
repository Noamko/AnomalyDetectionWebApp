const fs = require("fs");
const csv = require("csvtojson");
// csv().fromFile('tmp\\train.csv').then((jsonObj)=>{
//     console.log(jsonObj);
// })
// console.log(jsonObj);
let rawdata = fs.readFileSync('tmp\\AnomalyReport.json');
let jsonData = JSON.parse(rawdata);
let ts = jsonData[0].Time_Step;
var size = Object.keys(jsonData).length;
for (var i = 0; i<size; i++){
    console.log(jsonData[i].Time_Step);
}

// console.log(ts);
