var myChart;
const userUI = document.getElementById("user_ui");
const corrolatedFeaturesSelector = document.getElementById(
  "corrolated_feature_select"
);
let corrolated_features_list = [];
async function uploadTrainingFile(x) {
  let formData = new FormData();
  let file = x.files[0];
  formData.append("csv_train_file", file);
  try {
    let r = await fetch("/uploadTraining", {
      method: "POST",
      body: formData,
    });
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
  } catch (e) {
    console.log(e.message);
  }
}

async function detectAnomalys() {
  const algorithem_selector = document.getElementById("alg_select");
  const btn = document.getElementById("upload_button");
  btn.innerHTML = "Detecting Please Wait";
  btn.disabled = true;
  const loading_indicator = document.getElementById("loading_ind");
  loading_indicator.style.display = "inline-block";

  document.getElementById("btu_button").style.display = "none";

  let lst = document.getElementById("corrolated_feature_select");
  corrolated_features_list = [];
  lst.innerHTML = "";

  try {
    let r = await fetch("/" + algorithem_selector.value, {
      method: "POST",
    });
    let result = await r.json();
    updateView(result);
    document.getElementById("btu_button").style.display = "inline-block";
  } catch (e) {
    console.log(e.message);
  }
}
async function corraltionSelectionChanged(x) {
  let features = x.value.split(" <---> ");
  let feature1_data = await getdata(features[0]);
  let feature2_data = await getdata(features[1]);
  feature1_data = feature1_data.slice(
    corrolated_features_list[x.selectedIndex][1][0],
    corrolated_features_list[x.selectedIndex][1][
      corrolated_features_list[x.selectedIndex][1].length - 1
    ]
  );

  feature2_data = feature2_data.slice(
    corrolated_features_list[x.selectedIndex][1][0],
    corrolated_features_list[x.selectedIndex][1][
      corrolated_features_list[x.selectedIndex][1].length - 1
    ]
  );
  if (myChart) {
    myChart.destroy();
  }
  myChart = createChart({
    type: "line",
    data: {
      labels: corrolated_features_list[x.selectedIndex][1],
      datasets: [
        {
          label: features[0],
          data: feature1_data,
          backgroundColor: "#3B9FFB ",
        },
        {
          label: features[1],
          data: feature2_data,
          backgroundColor: "#00BA59",
        },
      ],
    },
  });
}

async function updateView(detection_result) {
  const corrolated_features_selector = document.getElementById(
    "corrolated_feature_select"
  );

  const uploadUI = document.getElementById("upload_ui");
  const userUI = document.getElementById("user_ui");

  let temp;
  for (i in detection_result) {
    let timestep = detection_result[i]["Time Step"];
    let cf =
      detection_result[i]["Coralated Feture_1"] +
      " <---> " +
      detection_result[i]["Coralated Feture_2"];
    if (temp != cf) {
      corrolated_features_list.push([cf, []]);
      temp = cf;
    } else {
      corrolated_features_list[corrolated_features_list.length - 1][1].push(
        timestep
      );
    }
    addToTable(cf, timestep);
  }
  for (i in corrolated_features_list) {
    const option = document.createElement("option");
    option.innerHTML = corrolated_features_list[i][0];
    corrolated_features_selector.appendChild(option);
  }

  await sleep(1000);
  corrolated_features_selector.onchange();
  uploadUI.className = "hide";
  userUI.className = "side-upload-div";
}

async function getdata(header) {
  let formData = new FormData();
  formData.append("header", header);
  try {
    let r = await fetch("/csvdata", {
      method: "POST",
      body: formData,
    });
    let result = await r.json();
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

function backToUpload() {
  const uploadUI = document.getElementById("upload_ui");
  const userUI = document.getElementById("user_ui");

  const btn = document.getElementById("upload_button");
  btn.innerHTML = "Detect!";
  btn.disabled = false;
  const loading_indicator = document.getElementById("loading_ind");
  loading_indicator.style.display = "none";

  uploadUI.className = "side-upload-div";
  userUI.className = "hide";
}

function backToUser() {
  const uploadUI = document.getElementById("upload_ui");
  const userUI = document.getElementById("user_ui");
  uploadUI.className = "hide";
  userUI.className = "side-upload-div";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createChart(config) {
  return new Chart(document.getElementById("chart"), config);
}

function addToTable(f, t) {
  const table = document.getElementById("anom_table");
  let newRow = document.createElement("tr");
  let corlated = document.createElement("td");
  let ts = document.createElement("td");
  corlated.innerHTML = f;
  ts.innerHTML = t;
  newRow.appendChild(corlated);
  newRow.appendChild(ts);
  table.appendChild(newRow);
}
