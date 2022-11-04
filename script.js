// These constants should hold query parameters to be fed to the map query field
const shelter = "Shelter";
const mapUrl = `https://www.google.com/maps/embed/v1/search?q=${shelter}&key=${GOOGLE_MAPS_API_KEY}`;

mapFrame.setAttribute("src", mapUrl);

debugger;

function setMapQuery(places) {
    const successCallback = (position) => {
        //console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const lat_long = String(latitude) + "," + String(longitude);

        mapFrame.setAttribute(
            "src",
            `https://www.google.com/maps/embed/v1/search?q=${places}&key=${GOOGLE_MAPS_API_KEY}&center=${lat_long}&zoom=15`
        );
    };

    const errorCallback = (error) => {
        console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

}

btnContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
        const getPlaces = e.target.innerText;
        setMapQuery(getPlaces);
    }
});


// TODO: see how to optimize this code
const successCallback = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const lat_long = String(latitude) + "," + String(longitude);

    mapFrame.setAttribute(
        "src",
        `https://www.google.com/maps/embed/v1/search?q=${shelter}&key=${GOOGLE_MAPS_API_KEY}&center=${lat_long}&zoom=15`
    );
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


//quick website improvements
//detect dark mode

const isDarkMode = () => {
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
};


