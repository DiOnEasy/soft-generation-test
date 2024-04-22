// import s from "./Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import CityWeatherCard from "../../components/city-weather-card/CityWeatherCard";
import { SearchWeatherField } from "../../components/search-weather-field/SearchWeatherField";
import { RootState, AppThunk } from "../../store/store";
import React, { useEffect, useState } from "react";
import {
  fetchWeather,
  fetchWeatherByCityName,
} from "../../store/slices/card-weather/cardWeatherSlice";
import { Action } from "@reduxjs/toolkit";
import { Grid } from "@mui/material";

export const Home: React.FC = () => {
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const { userData,  } = useSelector((state: RootState) => state.auth);

  const onSearch = (name: string) => {
    dispatch(fetchWeatherByCityName(name) as unknown as Action);
  };
  const dispatch = useDispatch();
  const { loading, weatherData, error } = useSelector(
    (state: RootState) => state.weather,
  );

  useEffect(() => {
    dispatch(fetchWeather(userData?.cities) as unknown as Action); // Not recommended
    setIsInitialFetch(false); // Устанавливаем флаг isInitialFetch в false после первого запроса
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !error && weatherData.length > 0) {
      console.log("Weather Data:", weatherData);
    } else if (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [loading, error, weatherData]);
console.log(weatherData)
  return (
    <div>
      <SearchWeatherField onSearch={onSearch} />
      {loading && isInitialFetch ? (
        <div>loading data...</div>
      ) : (
        <Grid container padding={1} alignItems={"center"} justifyContent={"space-around"}>
          {weatherData?.map((data) => (
            <Grid item md={4} xs={12}>
              <CityWeatherCard
                name={data.city}
                temperature={data.temperature}
                weather={data.weatherDescription}
                icon={data.icon}
                id={data.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {loading && <div> loading data... </div>}
      {!weatherData.length && <div>Add your first city</div>}
    </div>
  );
};
