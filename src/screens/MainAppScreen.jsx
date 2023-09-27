import React from "react";
import {Button, Center, Flex, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function MainAppScreen() {
    return (
        <Center height={"85svh"}>
            <Flex
                direction={"column"}
                minWidth={"20vw"}
                maxWidth={"100vw"}
                alignItems={"center"}
                gap={"1.5rem"}
            >
                <Text>Enter into Student Info System</Text>
                <Link to={"/chat-bot"}>
                    <Button colorScheme={"teal"} rounded={"xl"}>
                        Enroll Now
                    </Button>
                </Link>
            </Flex>
        </Center>
    );
}

export default MainAppScreen;
