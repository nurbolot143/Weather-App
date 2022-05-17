const _apiKey = "3d1d6b9619dbbc96836b1983191a406b";
const _apeBase = "https://api.openweathermap.org/data/2.5/weather?q";
const unit = "metric";

const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status${res.status}`);
  }

  return await res.json();
};

const getWeather = async (query) => {
  const url = `${_apeBase}=${query}&appid=${_apiKey}&units=${unit}`;

  const res = await getResource(url)
    .then((response) => response)
    .catch((e) => console.log(e));

  return _transformWeather(res);
};

const days = ["San", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const _transformWeather = (data) => {
  const temp = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const city = data.name;
  const icon = data.weather[0].icon;

  const date = new Date((data.dt + data.timezone - 10800) * 1000);
  const today = days[date.getDay()];
  const currentDate = String(date).slice(4, 15);
  const time = String(date).slice(16, 21);
  const imageURL = `images/icons/${icon}.png`;

  return {
    temp: temp,
    cityName: city,
    imageURL: imageURL,
    weatherDescription: weatherDescription,
    today: today,
    date: currentDate,
    time: time,
  };
};

const form = document.querySelector("#form");
const img = document.querySelector("img");
const temp = document.querySelector(".temp");
const weatherDescription = document.querySelector(".description");
const cityName = document.querySelector(".city");
const time = document.querySelector(".time");
const today = document.querySelector(".today");
const date = document.querySelector(".date");

const onSetWeather = (data) => {
  img.src = data.imageURL;
  temp.innerHTML = data.temp + "<span>&#176;</span>";
  weatherDescription.innerHTML = data.weatherDescription;
  cityName.innerHTML = data.cityName;
  time.innerHTML = data.time;
  today.innerHTML = data.today;
  date.innerHTML = data.date;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = document.querySelector("#cityInput");

  getWeather(query.value)
    .then(onSetWeather)
    .catch((e) => console.log(e));

  query.value = "";
});
