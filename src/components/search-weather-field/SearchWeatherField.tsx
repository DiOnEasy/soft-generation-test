import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";


interface SearchFormProps {
  onSearch: (city: string) => void;
}

export const SearchWeatherField: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
    }
  };

  return (
    <form
      style={{ textAlign: "center", margin: "20px 0" }}
      onSubmit={handleSubmit}
    >
      <Grid spacing={1} container alignItems="center" component="div">
        <Grid xs={12} item>
          <TextField
            style={{ margin: "0 10px" }}
            id="outlined-search"
            label="Enter City Name"
            type="search"
            variant="outlined"
            value={city}
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={12} item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "0 10px", padding: "10px 20px" }}
          >
            Add City
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
