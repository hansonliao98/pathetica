import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "./scenes/navbar";

function App() {
  const mode = useSelector((state) => state.mode); //grab state from global state
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //set up theme. UseMemo makes so this function ONLY RUNS when its called, Rather than running when the page loads
  const isAuth = Boolean(useSelector((state) => state.token)); //If state token exists, we authorize

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Identical to a css reset */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                isAuth ? (
                  <div>
                    <Navbar />
                    <HomePage />
                  </div>
                ) : (
                  <Navigate to={"/"}></Navigate>
                )
              }
            />
            {/* IF isAuth is true, then go to home, ELSE go back to login page */}
            <Route
              path="/profile/:userId"
              element={
                isAuth ? <ProfilePage /> : <Navigate to={"/"}></Navigate>
              }
            />
            {/* IF isAuth is true, then go to home, ELSE go back to login page */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
