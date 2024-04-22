import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { config } from "../../../config";
import { initializeApp } from "firebase/app";
import { Weather, WeatherState } from "./card-weather.inerface";



const initialState: WeatherState = {
  loading: false,
  loadingUpdate: false,
  weatherData: [],
  error: null,
};

const apiKey = config.OPEN_WEATHER_MAP_API;


const app = initializeApp(config.firebaseConfig);
const firestore = getFirestore();

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (cityIds: number[]) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/group?id=${cityIds.join(",")}&units=metric&appid=${apiKey}`,
      );
      const weatherData: Weather[] = response.data.list.map(
        (cityData: any) => ({
          city: cityData.name,
          temperature: cityData.main.temp,
          weatherDescription: cityData.weather[0].description,
          icon: cityData.weather[0].icon,
          id: cityData.id,
        }),
      );
      return weatherData;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchWeatherByCityName = createAsyncThunk(
  "weather/fetchCityWeather",
  async (cityName: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
      );
      const cityWeather: Weather = {
        city: response.data.name,
        temperature: response.data.main.temp,
        weatherDescription: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        id: response.data.id,
      };

      const addCityToUser = async (userId: string, cityId: string) => {
        const userRef = doc(firestore, "users", userId);

        const userSnapshot = await getDocs(
          query(collection(firestore, "users"), where("userId", "==", userId)),
        );
        if (userSnapshot.empty) {
          await setDoc(userRef, { userId, cities: [cityId.toString()] });
        } else {
          await updateDoc(userRef, { cities: arrayUnion(cityId.toString()) });
        }
      };

      addCityToUser(localStorage.getItem("userId") || "", response.data.id);
      return cityWeather;
    } catch (error) {
      throw error;
    }
  },
);

export const removeCity = createAsyncThunk(
  "weather/removeCityFromFirebase",
  async (cityId: number) => {
    try {
      const userRef = doc(
        firestore,
        "users",
        localStorage.getItem("userId") || "",
      );
      const userSnapshot = await getDocs(
        query(
          collection(firestore, "users"),
          where("userId", "==", localStorage.getItem("userId")),
        ),
      );
      if (!userSnapshot.empty) {
        await updateDoc(userRef, { cities: arrayRemove(cityId.toString()) });
        return cityId;
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw error;
    }
  },
);

export const updateCityWeather = createAsyncThunk(
  "weather/updateCityWeather",
  async (cityId: number) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`,
      );
      const cityWeather: Weather = {
        city: response.data.name,
        temperature: response.data.main.temp,
        weatherDescription: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        id: response.data.id,
      };

      return cityWeather;
    } catch (error) {
      throw error;
    }
  },
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(fetchWeatherByCityName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCityName.fulfilled, (state, action) => {
        state.loading = false;
        const newCity = action.payload;
      
        const cityAlreadyExists = state.weatherData.some(
          (city) => city.id === newCity.id
        );
      
        if (!cityAlreadyExists) {
          state.weatherData.push(newCity);
        }
      })
      
      .addCase(fetchWeatherByCityName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(removeCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.weatherData.findIndex(
          (weather) => weather.id === action.payload,
        );
        if (index !== -1) {
          state.weatherData.splice(index, 1);
        }
      })
      .addCase(removeCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(updateCityWeather.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateCityWeather.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const updatedCity = action.payload;
        const index = state.weatherData.findIndex((weather) => weather.id === updatedCity.id);
        if (index !== -1) {
          state.weatherData[index] = updatedCity;
        }
      })
      .addCase(updateCityWeather.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.error.message || "An error occurred.";
      })
  },
});

export default weatherSlice.reducer;
