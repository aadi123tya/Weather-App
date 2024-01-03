import React, { useEffect, useState } from "react";

function TempCard() {
  const [city, setCityName] = useState(null);
  const [search, setSearch] = useState("Ajmer");
  const [wind,setWind] = useState(null)

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a100c84e29d1ad281ed39066852dca36`;
      const response = await fetch(url);
      const resJson = await response.json();

      setCityName(resJson.main);
      setWind(resJson.wind)
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Weather App</h2>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              Enter City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          { !city ? (
           <p className=" flex justify-center font-extrabold">No data found</p>
          ) : (
            <>
              <div id="weatherInfo" className="mt-4 hidden">
                <h3 className="text-lg font-semibold mb-2">
                  Weather Information
                </h3>

                <p id="temperature" className="text-gray-700"></p>
                <p id="description" className="text-gray-600"></p>
              </div>
              <div className="flex items-center mb-4">
                {/* <img src="https://example.com/weather-icon.png" alt="Weather Icon" className="w-10 h-10 mr-4"/> */}
                <div>
                  <h2 className="text-2xl font-semibold">{search}</h2>
                  <p className="text-gray-500"></p>
                </div>
              </div>

              {/* <!-- Temperature --> */}
              <div className="text-4xl font-bold mb-4">{city.temp}</div>

              {/* <!-- Additional Information --> */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Humidity</p>
                  <p className="text-lg font-semibold">{city.humidity}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Wind Speed</p>
                  <p className="text-lg font-semibold">{!wind?'not available':wind.speed} km/h</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TempCard;
