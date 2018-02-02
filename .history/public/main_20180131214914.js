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

let dataPoints = [
  { label: "Windows", y: 0 },
  { label: "Mac Os", y: 0 },
  { label: "Linux", y: 0 },
  { label: "Android", y: 0 },
  { label: "Other", y: 0 }
];

const chartContainer = document.querySelector("#chartContainer");
