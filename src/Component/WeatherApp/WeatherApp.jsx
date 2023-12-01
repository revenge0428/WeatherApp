import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

export const WeatherApp = () => {
  const api_key = "5547dd5aab46608722fe1d8b508d64a4";
  const [Wicon, setWicon] = useState(cloud_icon);
  const [weatherCondition, setWeatherCondition] = useState('');

  const getWeatherMessage = () => {
    switch (weatherCondition) {
      case '01d':
      case '01n':
        return 'It\'s clear. You can go without an umbrella.';
      case '02d':
      case '02n':
        return 'It\'s cloudy. Consider bringing an umbrella.';
      case '04d':
      case '04n':
        return 'Drizzle expected. Bring an umbrella.';
      case '09d':
      case '09n':
      case '10d':
      case '10n':
      case '11d':
      case '11n':
        return 'It\'s raining. Bring an umbrella.';
      case '13d':
      case '13n':
        return 'Snowy weather. Wear a jacket.';
      case '50d':
      case '50n':
        return 'Windy conditions. Consider wearing a jacket.';
      default:
        return 'Check the weather conditions.';
    }
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
    location[0].innerHTML = data.name;

    setWeatherCondition(data.weather[0].icon);

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
      setWicon(wind_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={Wicon} alt="weather-icon" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">Iligan City</div>
      <div className="data-container">
        <div className="weather-message">{getWeatherMessage()}</div>
      </div>
    </div>
  );
};

export default WeatherApp;
