import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import MainAppScreen from "./screens/MainAppScreen";
import { Routes, Route } from "react-router-dom";
import ChatbotScreen from "./screens/ChatbotScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreens";
import DashboardScreen from "./screens/DashboardScreen";
import ProtectedRoute from "./utils/protectedRoutes";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetState } from "./slices/usersSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/chat-bot") {
      dispatch(resetState());
    }
  }, [dispatch, location.pathname]);

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
