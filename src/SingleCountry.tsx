import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export interface SingleCountrys {
  capital: string[];
  population: number;
  latlng: number[];
  flags: {
    svg: string;
  };
}

interface Weather {
  temperature: number;
  weather_icons: string[0];
  precip: number;
  wind_speed: number;
}

const SingleCountry: React.FC = () => {
  const { name } = useParams<string>();

  const [country, setCountry] = useState<SingleCountrys>();
  const [weather, setWeather] = useState<Weather>();

  const [countryLoading, setCountryLoading] = useState<boolean>(false);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
 
  useEffect(() => {
    submit();
  }, []);

  //fetch country data
  const loadCountry = () => {
    return fetch(`https://restcountries.com/v3.1/name/${name}`);
  };

  const submit = async () => {
    setCountryLoading(true);
    // loadCountry()
    // .then(res => res.json())
    // .then(data => {
    //     navigate("/country", {state: data});
    // }).catch(err => console.error(err));

    try {
      const res = await loadCountry();
      const countryInfo = await res.json();
      setCountry(countryInfo[0]);
      setCountryLoading(false);
    } catch (err) {
      setCountryLoading(false);
      console.error(err);
    }
  };

  // fetch weather data
  const API_KEY = "09276fa6e73a3c0e88013b6416c64880";
  const capitalWheather = () => {
    fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country?.capital[0]}`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current));
      
  };

  // capitalWheather();
  const handleWeather = () => {
      
    setWeatherLoading(true);
    capitalWheather();
    setWeatherLoading(false);
  };

  return (
    <div>
      <h1>Single Country</h1>
      {countryLoading ? (
        <p>Loading...</p>
      ) : country ? (
        <div>
          <p>{country.capital[0]}</p>
          <p>{country.population}</p>
          <p>{country.latlng}</p>
          <img style={{ width: "500px" }} src={country?.flags.svg} alt="" />
        </div>
      ) : (
        <h3>Country not found by name: {name}</h3>
      )}

      {country && <button onClick={handleWeather}>Capital Weather</button>}
      {weatherLoading ? <p>Loading...</p> : 
      weather && <div>
      <p>Temperature: {weather?.temperature}</p>
      <p>Percip: {weather?.precip}</p>
      <p>Wind Speed: {weather?.wind_speed}</p>
      <img style={{ width: "50px" }} src={weather?.weather_icons} alt="" />
      </div>}  
      
    </div>
  );
};

export default SingleCountry;
