const apiKey = "5bd6a080399aecbd094b217153273638";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const bgImage = document.querySelector(".bg-image");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
    document.querySelector(".weather").classList.add("active"); // edit
    

    const weather = data.weather[0].main.toLowerCase();
    const weatherContainer = document.querySelector(".weather");

    // Remove previous icon if any
    const oldIcon = document.querySelector(".weather-icon");
    if (oldIcon) oldIcon.remove();

    const icon = document.createElement("img");
    icon.classList.add("weather-icon");

    // Set image and quote by weather condition
    let character = "";
    let quote = "";

    if (weather === "clear") {
      character = "zuko";
      quote = "“You’re so beautiful when you hate the world.”";
    } else if (weather === "rain") {
      character = "katara";
      // quote = "“Love is brightest in the dark.”";
      quote = "“I will never, ever turn my back on people who need me.”";
    } else if (weather === "clouds" || weather === "cloudy" || weather === "party cloudy") {
      character = "iroh";
      quote = "“Life happens wherever you are.”";
    } else if (weather === "snow") {
      character = "yue";
      quote = "“To be a guardian of peace, one must know sacrifice.”";
    } else if (weather === "mist" || weather === "fog") {
      character = "mist-aang";
      quote = "“When we hit our lowest point, we are open to the greatest change.”";
    } else if (weather === "thunderstorm") {
        character = "azula";
        quote = "“WE WILL DOMINATE THE EARTH!”";
    } else {
      character = "toph";
      quote = "“I am the greatest earthbender in the world!”";
    }

    //icon.src = `images/${character}.jpg`;
    bgImage.src = `images/${character}.jpg`;
    weatherContainer.prepend(icon);
    document.querySelector(".quote").innerHTML = quote;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
