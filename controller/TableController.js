const table = document.getElementById("anom_table");

function addToTable(f, t) {
  let newRow = document.createElement("tr");
  let corlated = document.createElement("td");
  let ts = document.createElement("td");
  corlated.innerHTML = f;
  ts.innerHTML = t;
  newRow.appendChild(corlated);
  newRow.appendChild(ts);
  table.appendChild(newRow);
}
