const form = document.getElementById("voteForm");

form.addEventListener("submit", e => {
  const choice = document.querySelector("input[name=os]:checked").value;
  const data = { os: choice };
  e.preventDefault();
});
