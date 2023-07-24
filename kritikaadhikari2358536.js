const weatherContainer = document.getElementById("weather-container");
const search = document.getElementById("search");

// for default
async function fetchData() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Janakpur&appid=c5a4204bca44f86206faef24d6fc004d"
  );
  const datas = await response.json();
  console.log(datas);

  const card = document.createElement("div");
  card.className = "card";

  // for city name
  var cityName = document.createElement("h1");
  cityName.innerHTML = "Location: " + datas.name + ", " + datas.sys.country;
  cityName.classList.add("city-name"); //for styling
  card.appendChild(cityName);

  // for day and date
  var dt = new Date(datas.dt * 1000);

  // for day
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayOfWeek = daysOfWeek[dt.getDay()];
  var dayElement = document.createElement("p");
  dayElement.textContent = "Day: " + dayOfWeek;
  dayElement.classList.add("daydate");
  card.appendChild(dayElement);
  

  // for date
  var options = { year: "numeric", month: "long", day: "numeric" };
  var formattedDate = dt.toLocaleDateString(undefined, options);
  var dateElement = document.createElement("p");
  dateElement.textContent = "Date: " + formattedDate;
  dateElement.classList.add("daydate");
  card.appendChild(dateElement);


  // for weather icons
  var image = document.createElement("img");
  image.src = "https://openweathermap.org/img/wn/" + datas.weather[0].icon + ".png";
  image.alt = datas.weather[0].main;
  image.classList.add("icon"); //for styling
  card.appendChild(image);

  // for weather conditions
  var weatherCondition = document.createElement("h2");
  weatherCondition.innerHTML = datas.weather[0].main;
  weatherCondition.classList.add("weatherCondition"); //for styling
  card.appendChild(weatherCondition);

  // for temperature in Celsius
  var temperatureCelsius = datas.main.temp - 273.15; // Convert from Kelvin to Celsius
  var divContainer = document.createElement("div");
  divContainer.style="display:flex; width: 30%; margin:auto;"
  var temperature = document.createElement("h2");
  var imageContainer = document.createElement("img");
  imageContainer.style="width:60px"
  imageContainer.src="Thermometer.png";
  temperature.innerHTML = "Temperature: " + temperatureCelsius.toFixed(2) + " °C";
  // temperature.classList.add("temperature"); //for styling
  divContainer.appendChild(imageContainer);
  divContainer.appendChild(temperature);
  card.appendChild(divContainer)
  divContainer.classList.add("temperature");

  // for pressure in Pascal
  var pascalPressure = datas.main.pressure;
  var pressure = document.createElement("h3");
  pressure.innerHTML = "Pressure: " + (pascalPressure * 100) + " Pa"; //pressure changed to pa
  card.appendChild(pressure);
  pressure.classList.add("pressure"); //for styling

  // for wind speed
  
  var divContainer = document.createElement("div");
  divContainer.style="display:flex; width: 30%; margin:auto;"
  var windSpeed = document.createElement("h3");
  var imageContainer = document.createElement("img");
  imageContainer.style="width:60px"
  imageContainer.src="wind.png";
  windSpeed.textContent = "Wind Speed: " + datas.wind.speed + " m/s";
  divContainer.appendChild(imageContainer);
  divContainer.appendChild(windSpeed);
  card.appendChild(divContainer)
  divContainer.classList.add("windSpeed");

  // for humidity
  var humidity = document.createElement("h3");
  humidity.textContent = "Humidity: " + datas.main.humidity + "%";
  humidity.classList.add("humidity"); //for styling
  card.appendChild(humidity);
  humidity.classList.add("humidity"); //for styling

  weatherContainer.appendChild(card);
}

//this will search after the button is clicked
search.addEventListener("click", () => {
  loadMoreData();
});

//after enter is pressed, serach takes places
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadMoreData();
  }
});

window.addEventListener("load", () => {
  fetchData();
});



// -------------------------------------------
// for search
// ---------------------------------------------

async function loadMoreData() {
  var inputfield = document.getElementById("city").value;
  console.log(inputfield);

  weatherContainer.innerHTML = "";

  if (inputfield === "") {
    // Display error message for empty search
    const errorMessage = document.createElement("h1");
    errorMessage.textContent = "Unable to process. Please enter a city name first !!";
    alert("Unable to process! Please enter a city name first")
    errorMessage.classList.add("error-message"); //for styling
    weatherContainer.appendChild(errorMessage);
  } else {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputfield}&appid=c5a4204bca44f86206faef24d6fc004d`
    );
    const datas = await response.json();

    if (datas.cod === "404") {
      // Display error message for location not found
      const errorMessage = document.createElement("h1");
      alert("Invalid Location!! Enter a valid location")
      errorMessage.textContent = "Sorry! The location you've entered isn't valid. Try again";
      errorMessage.classList.add("error-message"); // for styling
      weatherContainer.appendChild(errorMessage);
    } else {
      // Create card and append weather data
      const card = document.createElement("div");
      card.className = "card";

    // for city name
    const cityName = document.createElement("h1");
    cityName.innerHTML = "Location: " + datas.name + ", " + datas.sys.country;
    cityName.classList.add("city-name"); //for styling
    card.appendChild(cityName);

    // for day and date
    var dt = new Date(datas.dt * 1000);

    // for day
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[dt.getDay()];
    const dayElement = document.createElement("p");
    dayElement.textContent = "Day: " + dayOfWeek;
    dayElement.classList.add("daydate");
    card.appendChild(dayElement);

    // for date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dt.toLocaleDateString(undefined, options);
    const dateElement = document.createElement("p");
    dateElement.textContent = "Date: " + formattedDate;
    dayElement.classList.add("daydate");
    card.appendChild(dateElement);

    // for weather icons
    const image = document.createElement("img");
    image.src = "https://openweathermap.org/img/wn/" + datas.weather[0].icon + ".png";
    image.alt = datas.weather[0].main;
    image.classList.add("icon"); //for styling
    card.appendChild(image);

    // for weather conditions
    const weatherCondition = document.createElement("h2");
    weatherCondition.innerHTML = datas.weather[0].main;
    weatherCondition.classList.add("weatherCondition"); //for styling
    card.appendChild(weatherCondition);

    // for temperature in Celsius
    var temperatureCelsius = datas.main.temp - 273.15; // Convert from Kelvin to Celsius
    var divContainer = document.createElement("div");
    divContainer.style="display:flex; width: 30%; margin:auto;"
    var temperature = document.createElement("h2");
    var imageContainer = document.createElement("img");
    imageContainer.style="width:60px"
    imageContainer.src="Thermometer.png";
    temperature.innerHTML = "Temperature: " + temperatureCelsius.toFixed(2) + " °C";
    // temperature.classList.add("temperature"); //for styling
    divContainer.appendChild(imageContainer);
    divContainer.appendChild(temperature);
    card.appendChild(divContainer)
    divContainer.classList.add("temperature");

      

    // for pressure in Pascal
    const pascalPressure = datas.main.pressure;
    const pressure = document.createElement("h3");
    pressure.innerHTML = "Pressure: " + (pascalPressure * 100) + " Pa"; //pressure changed to pa
    pressure.classList.add("pressure"); //for styling
    card.appendChild(pressure);


    // for wind speed
    // const windSpeed = document.createElement("h3");
    // windSpeed.textContent = "Wind Speed: " + datas.wind.speed + " m/s";
    // windSpeed.classList.add("windSpeed"); //for styling
    // card.appendChild(windSpeed);

    var divContainer = document.createElement("div");
    divContainer.style="display:flex; width: 30%; margin:auto;"
    const windSpeed = document.createElement("h3");
    var imageContainer = document.createElement("img");
    imageContainer.style="width:60px"
    imageContainer.src="wind.png";
    windSpeed.textContent = "Wind Speed: " + datas.wind.speed + " m/s";
    divContainer.appendChild(imageContainer);
    divContainer.appendChild(windSpeed);
    card.appendChild(divContainer)
    divContainer.classList.add("windSpeed");
  

    // for humidity
    const humidity = document.createElement("h3");
    humidity.textContent = "Humidity: " + datas.main.humidity + "%";
    humidity.classList.add("humidity"); //for styling
    card.appendChild(humidity);

      weatherContainer.appendChild(card);
    }
  }
}


