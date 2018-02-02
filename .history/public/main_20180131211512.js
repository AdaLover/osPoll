const form = document.getElementById("voteForm");

form.addEventListener("submit", e => {
  const choice = document.querySelector("input[name=os]:checked").value;

  e.preventDefault();
});
