import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "./city-weather.interface";



export const fetchWeatherByCityId = createAsyncThunk(
  "weather/fetchWeatherByCityId",
  async (cityId: number) => {
    try {
      const apiKey = "08eef4b90074e6d38726f67dca0722f3"; // Замените 'your_api_key' на ваш API-ключ
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`,
      );
      const data: WeatherData = {
        city: response.data.name,
        temperature: response.data.main.temp,
        weatherDescription: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
      };
      return data;
    } catch (error) {
      throw error;
    }
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    loading: false,
    weatherData: null as WeatherData | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCityId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCityId.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherByCityId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default weatherSlice.reducer;
