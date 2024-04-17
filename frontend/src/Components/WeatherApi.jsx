import React, { useState } from 'react';

const WeatherApi = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
  
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=30d8bd2529b34d59bd5101020241704&q=${city}`);
      const data = await response.json();
      console.log(data)
      setWeatherData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <p>Enter city to get weather information</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ marginRight: '10px' }}
      />
      <button className='btn btn-info' type="submit">Search</button>
    </form>
    
  </div>
  <div style={{marginTop:"-14%"}}>
{weatherData && (
      <div style={{ textAlign: 'center' }}>
        <h5>Weather in {weatherData.location?.name}</h5>
        <p>Temperature: {weatherData.current.temp_c}°C</p>
        <p>Weather: {weatherData.current.condition.text}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
      </div>
    )}
  </div>
      </>
  
  );
};

export default WeatherApi;
