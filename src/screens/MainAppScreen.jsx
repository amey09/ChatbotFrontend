import React from "react";
import {Button, Center, Flex, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function MainAppScreen() {
    return (
        <Center minHeight={"90svh"}>
            <Flex
                direction={"column"}
                minWidth={"20vw"}
                maxWidth={"100vw"}
                alignItems={"center"}
                gap={"1.5rem"}
            >
                <Text>Welcome to Session Scheduler</Text>
                <Link to={"/dashboard"}>
                    <Button colorScheme={"teal"} rounded={"xl"}>
                        Get Started
                    </Button>
                </Link>
            </Flex>
        </Center>
    );
}

export default MainAppScreen;
