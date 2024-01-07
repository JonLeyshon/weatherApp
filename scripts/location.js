// export let locationData = {};
// const locationButton = document.getElementById("find-your-location");
// export async function getLocation() {
//   await navigator.geolocation.getCurrentPosition(success, error);

let locationData = { latitude: 53.417112, longitude: -2.767604 };
export function getLocation() {
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
  }).then((data) => {
    return data;
  });
}

// locationButton.addEventListener("click", () => {
//   getLocation().then((resolvedLocationData) => {
//     locationData = resolvedLocationData;
//   });
// });
