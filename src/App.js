import React from "react";
import Navbar from "./components/Navbar";
import MainAppScreen from "./screens/MainAppScreen";

import {Routes, Route} from "react-router-dom";
import ChatbotScreen from "./screens/ChatbotScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreens";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={"/login"} element={<LoginScreen/>}/>
                <Route path={"/register"} element={<RegisterScreen/>}/>
                <Route path={"/"} element={<MainAppScreen/>}/>
                <Route path={"/chat-bot"} element={<ChatbotScreen/>}/>
            </Routes>
        </>
    );
}

export default App;
