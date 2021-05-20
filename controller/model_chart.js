var ctx = document.getElementById("modelChart");
function updateData(x) {
  let type = x[0];
  let lables = x[1];
  let label = x[2];
  let data = x[3];
  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: lables,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: "#000",
          borderWidth: 1,
        },
      ],
    },
  });
}
