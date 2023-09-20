import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "../chatbot/config";
import actionProvider from "../chatbot/actionProvider";
import messageParser from "../chatbot/messageParser";
import { Center } from "@chakra-ui/react";
import "react-chatbot-kit/build/main.css";
import "../styles/Chatbot-styles.css";

function ChatbotScreen() {
    return (
        <Center height={"100svh"} paddingTop={"15svh"}>
            <div className="chatbot-styles">
                <Chatbot
                    config={config}
                    actionProvider={actionProvider}
                    messageParser={messageParser}
                />
            </div>
        </Center>
    );
}

export default ChatbotScreen;
