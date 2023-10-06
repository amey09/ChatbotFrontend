import {Button, Flex, Heading, VStack, Text} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";

function Dashboard({eventDate, Time, deleteBooking}) {
    const navigate = useNavigate();
    return (
        <Flex
            borderLeft={"5px solid teal"}
            padding={"0 0.5rem 0 1rem"}
            boxShadow="xl"
            flexWrap="nowrap"
            position="relative"
        >
            <VStack alignItems={"left"} flex={1} padding={"0.5rem 0"}>
                <Heading fontSize={"1.2rem"}>Meeting with Dr.Jyoti</Heading>
                <Text color={"orange"}>Online</Text>
                <Text>
                    {eventDate} - {Time}
                </Text>
                <Flex justifyContent={"space-between"} alignContent={"center"}>
                    <Button variant={"link"} colorScheme={"blue"}>
                        Reschedule
                    </Button>
                    <Button variant={"link"} colorScheme={"red"} onClick={deleteBooking}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme={"teal"}
                        size={"sm"}
                        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                        onClick={() => navigate("/chat-bot")}
                    >
                        New Booking
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    );
}

export default Dashboard;
