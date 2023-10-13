import React from "react";
import Navbar from "./components/Navbar";
import MainAppScreen from "./screens/MainAppScreen";

import { Routes, Route } from "react-router-dom";
import ChatbotScreen from "./screens/ChatbotScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreens";
import DashboardScreen from "./screens/DashboardScreen";
import ProtectedRoute from "./utils/protectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/login"} element={<LoginScreen />} />
        <Route path={"/register"} element={<RegisterScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path={"/"} element={<MainAppScreen />} />
          <Route path={"/chat-bot"} element={<ChatbotScreen />} />
          <Route path={"/dashboard"} element={<DashboardScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
