// domrefs
const currentDayRef = document.getElementById("currentDay");
const hourlyUpdates = document.getElementsByClassName("hourlyUpdate");
const dayContainer = document.getElementsByClassName("daycontainer");
const searchBtnRef = document.getElementById("search-btn");
const locationButton = document.getElementById("find-your-location");
const warningRef = document.getElementById("warning");

export function updateCurrentData(resp) {
  let date = resp.data.dt * 1000;
  date = new Date(date).toDateString();
  let image = resp.data.weather[0].icon;
  let temp = Math.floor(resp.data.main.temp);
  let description = resp.data.weather[0].description;
  let wind = resp.data.wind.speed;
  let lowTemp = Math.floor(resp.data.main.temp_min);
  let highTemp = Math.floor(resp.data.main.temp_max);
  let city = resp.data.name;
  let country = resp.data.sys.country;
  warningRef.innerHTML = "";
  currentDayRef.innerHTML = `<h2>${city},${country}</h2>
        <h2 id="todayDate">${date}</h2>
        <img
          src="https://openweathermap.org/img/wn/${image}@2x.png"
          alt="Weather image"
        />
        <p>${temp}&deg;C </p>
        <p>${description}</p>
        <p>Wind Speed: ${wind} m/s</p>
        <p>Lows of ${lowTemp}&deg;C</p>
        <p>Highs of ${highTemp}&deg;C</p>`;
}

export function updateLaterData(resp) {
  for (let i = 0; i < 4; i++) {
    let hour = resp.data.list[i].dt * 1000;
    hour = new Date(hour).getHours();
    let image = resp.data.list[i].weather[0].icon;
    let weatherDesc = resp.data.list[i].weather[0].description;
    let temp = Math.floor(resp.data.list[i].main.temp);

    hourlyUpdates[i].innerHTML = `<p>${hour}:00 GMT</p>
      <img
        src="https://openweathermap.org/img/wn/${image}@2x.png"
        alt="Weather"
      />
      <p>${weatherDesc}</p>
      <p>${temp}&deg;C</p>`;
  }
}

export function updateNextDayData(resp) {
  let datesData = resp.data.list.filter((day) => day.dt_txt.includes("12:00"));
  console.log(datesData);
  for (let i = 0; i < 3; i++) {
    let daysOfTheWeekArr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let date = new Date(datesData[i].dt * 1000);
    let dayofTheWeek = daysOfTheWeekArr[date.getDay()];
    let temp = Math.floor(datesData[i].main.temp);
    let weatherDesc = datesData[i].weather[0].description;
    let weatherImage = datesData[i].weather[0].icon;

    dayContainer[i].innerHTML = `<p> ${dayofTheWeek} </p>
                                      <img src="https://openweathermap.org/img/wn/${weatherImage}@2x.png">
                                      <p>${weatherDesc}</p>
                                      <p>${temp} &deg;C </p>`;

    searchBtnRef.classList.remove("is-loading");
    locationButton.classList.remove("is-loading");
  }
}
