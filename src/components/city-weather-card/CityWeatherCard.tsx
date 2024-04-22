import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeCity,
  updateCityWeather,
} from "../../store/slices/card-weather/cardWeatherSlice";
import { Action } from "@reduxjs/toolkit";
import { CityWeatherProps } from "./weather.interface";
import { RootState } from "../../store/store";

const CityWeatherCard: React.FC<CityWeatherProps> = ({
  name,
  temperature,
  weather,
  icon,
  id,
}) => {
  const dispatch = useDispatch();
  const { loadingUpdate } = useSelector((state: RootState) => state.weather);
  const removeCard = (removeCityId: number) => {
    dispatch(removeCity(removeCityId) as unknown as Action);
  };
  const updateWeather = (updateCityId: number) => {
    dispatch(updateCityWeather(updateCityId) as unknown as Action);
  };

  return (
    <Card
      style={{
        minWidth: "275px",
        margin: "10px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {!loadingUpdate ? (
        <CardContent>
          <img
            style={{ background: "gray", borderRadius: "12px" }}
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt=""
          />
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: "10px" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ marginBottom: "5px" }}
          >
            Temperature: {temperature}°C
          </Typography>
          <Typography variant="body2" component="p">
            Weather: {weather}
          </Typography>
          <Button onClick={() => updateWeather(id)} variant="text">
            Update
          </Button>

          <Link
            to={`/weather/${id}`}
            style={{
              display: "inline-block",
              cursor: "pointer",
              margin: "0 10px",
              padding: "10px 20px",
              background: "gray",
              textDecoration: "none",
              color: "white",
              marginTop: "15px",
            }}
          >
            Read More
          </Link>
          <Button variant="text" onClick={() => removeCard(id)} color="error">
            Delete
          </Button>
        </CardContent>
      ) : (
        <CircularProgress />
      )}
    </Card>
  );
};

export default CityWeatherCard;
