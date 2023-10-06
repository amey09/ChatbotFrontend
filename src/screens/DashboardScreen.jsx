import {Button, Flex, Heading} from "@chakra-ui/react";
import React from "react";
import Dashboard from "../components/Dashboard";

const DashboardScreen = () => {

    return (
        <Flex flexDir={"column"} padding={"1rem 1rem"} gap={"1rem"}>
            <Dashboard/>
            <>
                <Heading>No Bookings</Heading>
                <Flex justifyContent={"space-between"} alignContent={"center"}>
                    <Button
                        colorScheme={"teal"}
                        size={"sm"}
                        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                    >
                        New Booking
                    </Button>
                </Flex>
            </>
        </Flex>
    );
};

export default DashboardScreen;
