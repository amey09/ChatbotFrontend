import React from 'react'
import {Alert, AlertIcon, Button, Center, Flex, Heading, Text} from "@chakra-ui/react";
import {useLogoutMutation} from "../slices/usersApiSlice";
import {useDispatch} from "react-redux";
import {logout} from "../slices/authSlice";
import {useNavigate} from "react-router-dom";

const ErrorComponent = () => {
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return (
        <Center height={"80vh"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Flex maxW={"50svw"} textAlign={"center"} flexDir={"column"} gap={"1rem"}>
                <Heading size={"lg"}>We're experiencing issues.</Heading>
                <Text>Try again after sometime.</Text>
                <Alert status={"error"}>
                    <AlertIcon/>
                    Your browser isn't allowing cookie to be set.
                </Alert>
                <Button colorScheme={"red"} onClick={async () => {
                    await logoutApiCall
                    dispatch(logout())
                    navigate("/login")
                }}>Logout</Button>
            </Flex>
        </Center>
    )
}
export default ErrorComponent