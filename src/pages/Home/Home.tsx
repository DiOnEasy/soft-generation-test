// import s from "./Home.module.css";

import CityWeatherCard from "../../components/city-weather-card/CityWeatherCard";
import { SearchWeatherField } from "../../components/search-weather-field/SearchWeatherField";

export const Home = () => {
  const onSearch = () =>{
    return 1
  }
  return (
    <div>
      <SearchWeatherField onSearch={onSearch} />
      <CityWeatherCard />
    </div>
  );
};
