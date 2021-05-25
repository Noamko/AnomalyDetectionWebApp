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
        },
      ],
    },

    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(171,171,171,1)",
              lineWidth: 5,
            },
          },
        ],
      },
    },
  });
}
