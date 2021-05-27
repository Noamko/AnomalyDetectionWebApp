const fs = require("fs");
/**
 * In server.js write the following line. (in the top of the page)
 * const csvParseToMap = require("./utils"); 
 * 
 * Then you can get a map by running csvToMap function :
 * example. (To print the map!)
 * console.log(csvParseToMap.csvToMap('tmp\\anomaly.csv'));

 * @param {string} pathFile 
 * @returns {Map}
 */
module.exports.csvToMap = function csvToMap(pathFile) {
  const data = fs.readFileSync(pathFile);
  return parseCSVToMap(data.toString(), ",");
};
function parseCSVToMap(str, delimiter = ",") {
  var map = new Map();
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  headers[headers.length - 1] = headers[headers.length - 1].slice(
    0,
    headers[headers.length - 1].indexOf("\r")
  );
  var size = Object.keys(headers).length;
  for (let i = 0; i < size; i++) {
    map.set(headers[i], []);
  }

  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  var temp = new Array(size);
  for (var i = 0; i < size; i++) {
    temp[i] = [];
  }
  for (var j = 0; j < rows.length; j++) {
    var row = rows[j].slice(0, rows[j].length).split(delimiter);
    row[row.length - 1] = row[row.length - 1].slice(
      0,
      row[row.length - 1].indexOf("\r")
    );
    for (var i = 0; i < temp.length; i++) {
      temp[i].push(row[i]);
    }
  }
  for (let i = 0; i < size; i++) {
    map.set(headers[i], temp[i]);
  }

  return map;
}
