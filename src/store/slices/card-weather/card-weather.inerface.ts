export interface Weather {
    city: string;
    temperature: number;
    weatherDescription: string;
    icon: string;
    id: number;
  }
  
  export interface WeatherState {
    loadingUpdate: boolean,
    loading: boolean;
    weatherData: Weather[];
    error: string | null;
  }