import React, { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CityWeather } from "./pages/city-weather/CityWeather";
import { Login } from "./pages/login/login";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "./store/slices/user/userSlice";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.uid) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = () => {
    dispatch(signInWithGoogle() as unknown as Action);
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/weather/:id" element={<CityWeather />} />
            </>
          ) : (
            <Route path="*" element={<Login login={login} />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
