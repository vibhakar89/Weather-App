import React, { useEffect, useState } from "react";
import axios from "axios";

function Forecast({ weather, toDate }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!data.coord) return;

      const apiKey = "api - key";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        // Pick one forecast every 8 intervals (24 hrs), i.e. 5 days
        const dailyData = response.data.list.filter((_, index) => index % 8 === 0);
        setForecastData(dailyData);
      } catch (err) {
        console.error("Forecast fetch error:", err);
      }
    };

    fetchForecast();
  }, [data]);

  const toggleTempUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const convertTemp = (temp) => {
    return isCelsius ? Math.round(temp) : Math.round(temp * 9 / 5 + 32);
  };

  return (
    <div>
      <div className="city-name">
        <h2>{data.name}, <span>{data.sys?.country}</span></h2>
      </div>
      <div className="date">
        <span>{toDate()}</span>
      </div>
      <div className="temp">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="temp-icon"
        />
        {convertTemp(data.main.temp)}
        <sup className="temp-deg" onClick={toggleTempUnit}>
          {isCelsius ? "°C | °F" : "°F | °C"}
        </sup>
      </div>
      <p className="weather-des">{data.weather[0].description}</p>
      <div className="weather-info">
        <div className="col">
          <p className="wind">{data.wind.speed} m/s</p>
          <p>Wind speed</p>
        </div>
        <div className="col">
          <p className="humidity">{data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>

      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData.map((item) => (
            <div className="day" key={item.dt}>
              <p className="day-name">{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img
                className="day-icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p className="day-temperature">
                {convertTemp(item.main.temp_min)}° /{" "}
                <span>{convertTemp(item.main.temp_max)}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;



