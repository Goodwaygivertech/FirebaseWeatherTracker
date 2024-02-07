import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "34f523949512a051cdb1285e503c83ed"; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault()
    fetchWeatherData();
  };

  return (
    <div className="bg-gray-900 shadow-xl  p-8 min-h-screen flex justify-center items-center">
      <div className=" w-2xl p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <form onSubmit={handleSearch} className="w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search By City Name ...."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error} Or incorrect City name </div>}
        {weatherData && (
          <div className="mt-2 flex bg-gradient-to-br from-lime-500 to-purple-500 w-full p-4 rounded-md ">
            <div>
              <h2 className="text-2xl font-semibold text-white bg-gradient-to-br inline p-1 mb-2 rounded-md from-red-500 to-purple-500">{weatherData.name}</h2>
              <p className="text-lg font-[500]">
                {weatherData.weather[0].description}
              </p>
              <p className="text-lg font-[500]">
                Temperature: {weatherData.main.temp}°C
              </p>
            </div>
            <div>
              {" "}
              <img
                className="w-24 h-auto"
                src="https://static.vecteezy.com/system/resources/previews/019/061/827/original/cloud-3d-icon-png.png"
                alt=""
              />
            </div>
          </div>
        )}

        <div className="w-full flex flex-col items-center bg-gray-200 p-4 mt-4 rounded-md shadow-md">
          <h1 className="text-4xl text-start block w-full text-gray-800 font-semibold">
            {city} Weather
          </h1>
          <div className="text-xl text-gray-800 mt-4 w-full grid grid-cols-2 gap-2">
            {/* Assuming 'weatherData' contains the forecast data */}
            {/* Forecast for today */}
            <div>
              {weatherData && (
                <div className="bg-white p-4 rounded-md shadow-xl hover:shadow-2xl ">
                  <p>Today</p>
                  <p>{weatherData.weather[0].description}</p>
                  <p>Temperature: {weatherData.main.temp}°C</p>
                </div>
              )}
            </div>
            {/* Forecast for tomorrow */}
            <div>
              {weatherData && (
                <div className="bg-white p-4 rounded-md shadow-xl hover:shadow-2xl ">
                  <p>Tomorrow</p>
                  {/* Assuming 'weatherData' contains the forecast for tomorrow */}
                  {/* Replace 'weatherData' with the actual data for tomorrow */}
                  <p>Scattered Clouds</p>
                  <p>Temperature: 25°C</p>
                </div>
              )}
            </div>
            {/* Forecast for the day after tomorrow */}
            <div>
              {weatherData && (
                <div className="bg-white p-4 rounded-md shadow-xl hover:shadow-2xl ">
                  <p>Day After Tomorrow</p>
                  {/* Assuming 'weatherData' contains the forecast for the day after tomorrow */}
                  {/* Replace 'weatherData' with the actual data for the day after tomorrow */}
                  <p>Broken Clouds</p>
                  <p>Temperature: 26°C</p>
                </div>
              )}
            </div>
            <div>
              {" "}
              <img
                className="w-36 h-auto"
                src="https://static.vecteezy.com/system/resources/previews/019/061/827/original/cloud-3d-icon-png.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
