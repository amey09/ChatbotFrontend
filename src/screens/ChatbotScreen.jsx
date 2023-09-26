import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "../chatbot/config";
import ActionProvider from "../chatbot/actionProvider";
import MessageParser from "../chatbot/messageParser";
import {Center} from "@chakra-ui/react";
import "react-chatbot-kit/build/main.css";
import "../styles/Chatbot-styles.css";

function ChatbotScreen() {

    return (
        <Center height={"100svh"} paddingTop={"15svh"}>
            <div className="chatbot-styles">
                <Chatbot
                    config={config}
                    actionProvider={ActionProvider}
                    messageParser={MessageParser}
                />
            </div>
        </Center>
    );
}

export default ChatbotScreen;
