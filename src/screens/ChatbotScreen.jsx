import React from "react";
import { Center } from "@chakra-ui/react";
import "react-chatbot-kit/build/main.css";
import "../styles/Chatbot-styles.css";

function ChatbotScreen() {
  return (
    <Center height={"100svh"} paddingTop={"15svh"}>
      <div className="chatbot-styles">
        Chatbot!
      </div>
    </Center>
  );
}

export default ChatbotScreen;