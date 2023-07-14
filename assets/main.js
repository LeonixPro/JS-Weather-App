const search = document.querySelector("#search"),
  search_wrap = document.querySelector(".search-location"),
  main_temp = document.querySelector(".temp-info"),
  city = document.querySelector(".city"),
  weather_i = document.querySelector(".weather-i"),
  btn = document.querySelector("#new-location"),
  weather_desc = document.querySelector(".weather-desc"),
  weather_status = document.querySelector(".weather-status"),
  wind = document.querySelector(".wind-speed"),
  sunrise = document.querySelector(".sunrise span"),
  sunset = document.querySelector(".sunset span"),
  humidity = document.querySelector(".humidity span"),
  cloudiness = document.querySelector(".cloudiness span"),
  pressure = document.querySelector(".pressure span"),
  visibility = document.querySelector(".visibility span");

window.onload = () => {
  document.querySelector(".preloader").style.display = "none";
};

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getLocation(event.target.value);
  }
});

btn.addEventListener("click", () => {
  if (search_wrap.classList.contains("show-search")) {
    return false;
  } else {
    search_wrap.classList.add("show-search");
  }
});

function getLocation(location) {
  const url = "API Key Here";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      search.value = "";
      document.querySelector("body").className = `${data.weather[0].main}`;
      document.querySelector("footer").style.display = "block";
      search_wrap.classList.remove("show-search");
      main_temp.innerHTML = `${data.main.temp.toFixed()} °C`;
      weather_i.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather">`;
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      weather_status.innerHTML = data.weather[0].main;
      weather_desc.innerHTML = data.weather[0].description;
      pressure.innerHTML = `${data.main.pressure} hPa`;
      humidity.innerHTML = `${data.main.humidity} %`;
      wind.innerHTML = `<i class="bi bi-wind"></i> Wind speed: ${data.wind.speed.toFixed()} m/s`;
      visibility.innerHTML = `${data.visibility / 1000} km`;
      sunrise.innerHTML = `${new Date(data.sys.sunrise).toLocaleTimeString(
        "en-US"
      )}`;
      sunset.innerHTML = `${new Date(data.sys.sunset).toLocaleTimeString(
        "en-US"
      )}`;
      cloudiness.innerHTML = `${data.clouds.all} %`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
