import React from "react";
import Navbar from "./components/Navbar";
import MainAppScreen from "./screens/MainAppScreen";

import { Routes, Route } from "react-router-dom";
import ChatbotScreen from "./screens/ChatbotScreen";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={"/"} element={<MainAppScreen />} />
                <Route path={"/chat-bot"} element={<ChatbotScreen />} />
            </Routes>
        </>
    );
}

export default App;
