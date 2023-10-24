import React from 'react'
import {Center, Flex, Spinner} from "@chakra-ui/react";

function Loader() {
    return (
        <Center height={"80vh"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Flex maxW={"50svw"} textAlign={"center"} flexDir={"column"} gap={"1rem"}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Flex>
        </Center>
    )
}

export default Loader