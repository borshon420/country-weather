import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./SingleCountry.css";

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
      <h1 style={{ fontWeight: 500, marginTop: 10 }}>Country Name: {name}</h1>
      {countryLoading ? (
        <p><CircularProgress /></p>
      ) : country ? (

        <div className="country-container">
          <div className="country-content">
            <p>Capital: {country.capital[0]}</p>
            <p>Population: {country.population}</p>
            <p>Latlng: {country.latlng}</p>
          </div>
          <img style={{ width: "50%" }} src={country?.flags.svg} alt="" />
        </div>

      ) : (
        <h3>Country not found by name: {name}</h3>
      )}

      {country && (
        <Button
          sx={{ width: "50%", mt: 3 }}
          onClick={handleWeather}
          variant="outlined"
          size="large"
        >
          Capital Weather
        </Button>
      )}
      {weatherLoading ? (
        <p>Loading...</p>
      ) : (

        weather && (
          <div className="country-content">
            <p>Temperature: {weather?.temperature}</p>
            <p>Percip: {weather?.precip}</p>
            <p>Wind Speed: {weather?.wind_speed}</p>
            <img
              style={{ width: "50px", borderRadius: "100%" }}
              src={weather?.weather_icons}
              alt=""
            />
          </div>
        )
      )}
    </div>
  );
};

export default SingleCountry;
