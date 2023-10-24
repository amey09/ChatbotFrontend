import React from 'react'
import {Center, Flex, Heading} from "@chakra-ui/react";

const ErrorComponent = () => {
    return (
        <Center height={"80vh"}>
            <Flex flexDir={"column"}>
                <Heading>Your browser isn't allowing cookie to be set. Sorry</Heading>
            </Flex>
        </Center>
    )
}
export default ErrorComponent
