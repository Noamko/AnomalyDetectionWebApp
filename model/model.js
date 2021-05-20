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
  console.log("detecting ");
  try {
    let r = await fetch("/detect", {
      method: "POST",
    });
    let result = await r.json();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}
