async function uploadTrainingFile(x) {
  let formData = new FormData();
  let file = x.files[0];
  formData.append("csv_train_file", file);
  try {
    let r = await fetch("/uploadTraining", {
      method: "POST",
      body: formData,
    });
    let result = await r.json();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}

async function uploadAnoamlyFile(x) {
  let formData = new FormData();
  let file = x.files[0];
  formData.append("csv_anomaly_file", file);
  try {
    let r = await fetch("/uploadAnomaly", {
      method: "POST",
      body: formData,
    });
    let result = await r.json();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}

async function detectAnomalys() {
  const btn = document.getElementById("upload_button");
  btn.innerHTML = "Detecting Please Wait";
  const algorithem_selector = document.getElementById("alg_select");
  console.log(algorithem_selector.value);
  try {
    let r = await fetch("/" + algorithem_selector.value, {
      method: "POST",
    });
    let result = await r.json();
    ts = [];
    for (var idx in result) {
      let timestep = result[idx]["Time Step "];
      let cf = result[idx]["Coralated Fetures "];
      addToTable(cf, timestep);
      ts.push(timestep);
    }
    updateData(["line", ts, "Anoamlies", [1, 2, 4, 5]]);
    btn.innerHTML = "Done";
  } catch (e) {
    console.log(e.message);
  }
}
