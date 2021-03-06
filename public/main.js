const form = document.getElementById("voteForm");
let host = window.location.href + "poll";
console.log(host);
form.addEventListener("submit", e => {
	const choice = document.querySelector("input[name=os]:checked").value;
	const data = { os: choice };

	fetch(host, {
		method: "post",
		body: JSON.stringify(data),
		headers: new Headers({ "Content-type": "application/json" })
	})
		.then(res => res.json())
		.then(data)
		.catch(err => console.log(err));

	e.preventDefault();
});

//data points for chartJs
let dataPoints = [
	{ label: "Windows", y: 0 },
	{ label: "MacOS", y: 0 },
	{ label: "Linux", y: 0 },
	{ label: "Android", y: 0 },
	{ label: "Other", y: 0 }
];
arrLoc = { Windows: 0, MacOS: 1, Linux: 2, Android: 3, Other: 4 };
//get request
fetch(host, {
	method: "get",
	headers: new Headers({ "Content-type": "application/json" })
})
	.then(res => res.json())
	.then(data => {
		let votesArr = data.votes;
		for (vote of votesArr) {
			let os = vote.os;
			os.replace(" ","");
			dataPoints[arrLoc[os]].y += 1;
		}
		//Chartjs Implementation
		const chartContainer = document.querySelector("#chartContainer");

		if (chartContainer) {
			const chart = new CanvasJS.Chart("chartContainer", {
				animationEnabled: true,
				theme: "theme2",
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
					if (x.label === data.os) {
						x.y += data.points;
					}
					return x;
				});
				chart.render();
			});
		}
	})
	.catch(err => console.log(err));
