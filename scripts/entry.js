const currentDayRef = document.getElementById("currentDay");
const hourlyUpdates = document.getElementsByClassName("hourlyUpdate");
let lat = "";
let lon = "";
function getCurrentWeatherData() {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=53.41787&lon=-2.904350&appid=373105f8347d3ec002619e8fe288fb6a&units=metric`
    )
    .then((resp) => {
      let date = resp.data.dt * 1000;
      date = new Date(date).toDateString();
      let image = resp.data.weather[0].icon;
      let temp = Math.floor(resp.data.main.temp);
      let description = resp.data.weather[0].description;
      let wind = resp.data.wind.speed;
      let lowTemp = Math.floor(resp.data.main.temp_min);
      let highTemp = Math.floor(resp.data.main.temp_max);
      let location = resp.data.name;

      currentDayRef.innerHTML = `<h2>${location}</h2>
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
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getLaterDates() {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=53.4908&lon=-2.9044&appid=373105f8347d3ec002619e8fe288fb6a&units=metric`
    )
    .then((resp) => {
      console.log(resp);
      for (let i = 0; i < 5; i++) {
        let hour = resp.data.list[i].dt * 1000;
        hour = new Date(hour).getHours();
        let image = resp.data.list[i].weather[0].icon;
        let weatherDesc = resp.data.list[i].weather[0].description;
        let temp = Math.floor(resp.data.list[i].main.temp);

        hourlyUpdates[i].innerHTML = `<p>${hour}:00</p>
      <img
        src="https://openweathermap.org/img/wn/${image}@2x.png"
        alt="Weather"
      />
      <p>${weatherDesc}</p>
      <p>${temp}&deg;C</p>`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
getCurrentWeatherData();
getLaterDates();
