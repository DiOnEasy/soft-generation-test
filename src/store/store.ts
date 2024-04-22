import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherReducer from "./slices/card-weather/cardWeatherSlice";
import cityWeatherReducer from "./slices/city-weather/cityWeatherSlice";
import userReducer from "./slices/user/userSlice";
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    cityWeather: cityWeatherReducer,
    auth: userReducer,
    // Добавьте другие редукторы здесь, если есть
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
