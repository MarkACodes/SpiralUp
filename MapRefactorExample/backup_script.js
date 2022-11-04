serviceScript.setAttribute(
  "src",
  `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
);

function initMap(itemsToQuery) {
  // debugger;

  // Please note that the majority of our map code is within this successCallback function
  // This is to enable geolocation
  const successCallback = (position) => {
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const user_Location = { lat: latitude, lng: longitude };
    // The map, centered at User_Location
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      mapId: 'd2fddb4cdc51e0d6', // Night Travel custom MapId
      center: user_Location,
    });
    // The marker, positioned at user_Location
    const marker = new google.maps.Marker({
      position: user_Location,
      map: map,
    });

    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };

    service.textSearch(
      { location: user_Location, radius: 500, query: itemsToQuery },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
  };

  function addPlaces(places, map) {
    const placesList = document.getElementById("places");
    while (placesList.firstChild) {
      placesList.removeChild(placesList.firstChild);
    }
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
initMap("homeless shelter");

// const buttonContainer = document.getElementById("btnContainer");

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const getPlaces = e.target.innerText;
    resultList.textContent = getPlaces;

    //initMap(getPlaces);

    switch (getPlaces) {
      case " Shelter":
        initMap("homeless shelter");
        break;
      case " Food":
        initMap("'food pantry' or 'soup kitchen'");
        break;
      case " Hospital":
        initMap("hospital");
        break;
      case " Library":
        initMap("library");
        break;
    }
  }
});
