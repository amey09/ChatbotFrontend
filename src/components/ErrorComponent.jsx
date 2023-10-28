import React from "react";
import {
    Alert,
    AlertIcon,
    Button,
    Center,
    Flex,
    Heading,
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {logout} from "../slices/authSlice";
import {useNavigate} from "react-router-dom";

const ErrorComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Center
            height={"80vh"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Flex maxW={"50svw"} textAlign={"center"} flexDir={"column"} gap={"1rem"}>
                <Heading size={"lg"}>We're experiencing issues.</Heading>
                <Alert status={"error"}>
                    <AlertIcon/>
                    Try again after sometime.
                </Alert>
                <Button
                    colorScheme={"red"}
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                >
                    Logout
                </Button>
            </Flex>
        </Center>
    );
};
export default ErrorComponent;
