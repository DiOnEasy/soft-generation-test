import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const CityWeatherCard = ({}) => {
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
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          style={{ marginBottom: "10px" }}
        >
          Keyiv
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginBottom: "5px" }}
        >
          Temperature: 10°C
        </Typography>
        <Typography variant="body2" component="p">
          Weather: sdjfkljdslkf
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CityWeatherCard;
