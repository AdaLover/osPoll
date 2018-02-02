// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("703fa550868412e2092a", {
  cluster: "ap2",
  encrypted: true
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function(data) {
  alert(data.message);
});
