import React, { useState } from "react";
import "./index.css";
require('dotenv').config();

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  
  
  // `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${process.env.API_KEY}`;
  // "https://api.openweathermap.org/data/2.5/weather?q=query&units=imperial&appid=process.env.API_KEY"



  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial&appid=56a40b5cd375ad105c9a74c10a3a4f2b")
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      " Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()]; //retrieve day of the week from days array, between 0 & 6
    let date = d.getDate(); //retrieve full date
    let month = months[d.getMonth()]; //retreive months from months array, between 0 & 11
    let year = d.getFullYear(); //get full year

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app"
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search here..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}℉</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;


