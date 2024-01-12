import { getLocation } from "./location.js";
import {
  updateCurrentData,
  updateLaterData,
  updateNextDayData,
} from "./domManipulation.js";

//dom refs
const searchBtnRef = document.getElementById("search-btn");
const inputRef = document.getElementById("input-bar");
const warningRef = document.getElementById("warning");
const locationButton = document.getElementById("find-your-location");
const apiKey = "373105f8347d3ec002619e8fe288fb6a";
//global vars
let location;

//event listeners
searchBtnRef.addEventListener("click", () => {
  location = inputRef.value;
  searchBtnRef.classList.add("is-loading");
  getCurrentWeatherData();
  getLaterDates();

  return;
});

locationButton.addEventListener("click", () => {
  locationButton.classList.add("is-loading");
  getLocalWeather();
});

//get weather functions
function getCurrentWeatherData() {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    )
    .then((resp) => {
      updateCurrentData(resp);
    })
    .catch(function (error) {
      console.log(error);
      warningRef.innerHTML = `<h1> Location Not found or API Down, Please check spelling and try again </h1>`;
      searchBtnRef.classList.remove("is-loading");
    });
}
function getLaterDates() {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
    )
    .then((resp) => {
      updateLaterData(resp);
      updateNextDayData(resp);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getLocalWeather() {
  const coords = await getLocation();
  function getCurrentWeatherDataLocal() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
      )
      .then((resp) => {
        updateCurrentData(resp);
      });
  }
  function getLaterDatesLocal() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
      )
      .then((resp) => {
        updateLaterData(resp);
        updateNextDayData(resp);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getCurrentWeatherDataLocal();
  getLaterDatesLocal();
}
