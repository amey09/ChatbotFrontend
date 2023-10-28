import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "../chatbot/config";
import ActionProvider from "../chatbot/actionProvider";
import MessageParser from "../chatbot/messageParser";
import {Button, Center, Flex, Heading} from "@chakra-ui/react";
import "react-chatbot-kit/build/main.css";
import "../styles/Chatbot-styles.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function ChatbotScreen() {
    const sessionId = useSelector((state) => state.users.sessionInfo);
    const navigate = useNavigate();
    return (
        <>
            {sessionId ? (
                <Center
                    height={"88.4svh"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <div className="chatbot-styles">
                        <Chatbot
                            config={config}
                            actionProvider={ActionProvider}
                            messageParser={MessageParser}
                        />
                    </div>
                </Center>
            ) : (
                <>
                    <Flex
                        height={"85svh"}
                        padding={"1rem"}
                        gap={"1rem"}
                        justifyContent={"center"}
                        flexDir={"column"}
                        maxW={"100%"}
                        alignItems={"center"}
                        textAlign={"center"}
                    >
                        <Heading size={"lg"}>
                            Chatbot can only be used to reschedule your sessions
                        </Heading>

                        <Button
                            colorScheme={"teal"}
                            size={"sm"}
                            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                            maxW={"fit-content"}
                            onClick={() => navigate("/dashboard")}
                        >
                            View Sessions
                        </Button>
                    </Flex>
                </>
            )}
        </>
    );
}

export default ChatbotScreen;
