const form = document.getElementById("voteForm");

form.addEventListener("submit", e => {
  const choice = document.querySelector("input[name=os]:checked").value;
  const data = { os: choice };

  fetch("http://localhost:4000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({ "content-type": "application/json" })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

  e.preventDefault();
});
//data points for chartJs
let dataPoints = [
  { label: "Windows", y: 0 },
  { label: "Mac Os", y: 0 },
  { label: "Linux", y: 0 },
  { label: "Android", y: 0 },
  { label: "Other", y: 0 }
];
//Chartjs Implementation
const chartContainer = document.querySelector("#chartContainer");

if (chartContainer) {
  const chart = new CanvasJS.chart("chartContainer", {
    animationEnabled: true,
    theme: "theme1",
    title: {
      text: "OS Results"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();

  //pusher code
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher("703fa550868412e2092a", {
    cluster: "ap2",
    encrypted: true
  });

  var channel = pusher.subscribe("osPoll");
  channel.bind("osVote", function(data) {
    dataPoints = dataPoints.map(x => {
      if (x.y === data.os) {
        x.y += data.points;
      }
      return x;
    });
  });
}
