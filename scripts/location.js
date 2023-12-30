const locationButton = document.getElementById("find-your-location");
let locationData = { latitude: 53.417112, longitude: -2.767604 };
function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(data) {
      locationData = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      };
      resolve(locationData);
    }

    function error(error) {
      reject(error);
    }
  });
}

// locationButton.addEventListener("click", () => {
//   getLocation().then((resolvedLocationData) => {
//     locationData = resolvedLocationData;
//   });
// });
