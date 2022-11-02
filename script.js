// These constants should hold query parameters to be fed to the map query field
const shelter = "Shelter";
const mapUrl = `https://www.google.com/maps/embed/v1/search?q=${shelter}&key=${GOOGLE_MAPS_API_KEY}`;

mapFrame.setAttribute("src", mapUrl);

debugger;
function setMapQuery(places) {
  mapFrame.setAttribute(
    "src",
    `https://www.google.com/maps/embed/v1/search?q=${places}&key=${GOOGLE_MAPS_API_KEY}`
  );
}

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const getPlaces = e.target.innerText;
    setMapQuery(getPlaces);
  }
});

