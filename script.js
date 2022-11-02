// These constants should hold query parameters to be fed to the map query field
const shelter = "Shelter";
const food = "";
const hospital = "";
const library = "";

debugger;
mapFrame.setAttribute(
  "src",
  `https://www.google.com/maps/embed/v1/search?q=${shelter}&key=${GOOGLE_MAPS_API_KEY}`
);

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    alert("call a function that hits tha api and updates the query");
  }
});
