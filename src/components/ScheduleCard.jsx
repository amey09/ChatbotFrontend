import {Button, IconButton} from "@chakra-ui/button";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    Heading,
    Text,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {AiOutlinePhone} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaUserAlt, FaLocationArrow} from "react-icons/fa";
import {BsClock} from "react-icons/bs";
import {HiOutlineStatusOnline} from "react-icons/hi";
import {resetState} from "../slices/usersSlice";
import {EmailIcon} from "@chakra-ui/icons";

const ScheduleCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {dateTime, wardenName, mode} = useSelector(
        (state) => state.users.sessionInfo
    );

    const Stopwatch = () => {
        const [countdown, setCountdown] = useState(15);
        useEffect(() => {
            const interval = setInterval(() => {
                if (countdown > 0) {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                } else {
                    navigate("/dashboard");
                    clearInterval(interval);
                    dispatch(resetState());
                }
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        });
        return (
            <Flex
                minHeight={"10svh"}
                backgroundColor={"teal"}
                alignItems={"center"}
                textAlign={"center"}
            >
                <Heading size={"md"}>
                    Redirecting to Dashboard in {countdown} seconds
                </Heading>
            </Flex>
        );
    };

    return (
        <>
            <Card
                minWidth={"200px"}
                backgroundColor={"white"}
                boxShadow="xl"
                rounded="md"
                maxHeight={"300px"}
            >
                <CardHeader
                    textColor={"teal.700"}
                    fontWeight={"600"}
                    fontSize="lg"
                    p={"1rem"}
                >
                    Session rescheduled successfully
                </CardHeader>
                <CardBody p={"1rem"}>
                    <Flex flexDir={"column"} gap={"0.5rem"} width={"100%"}>
                        <HStack spacing={"1.2rem"}>
                            <IconButton
                                variant={"outline"}
                                aria-label="User Profile Picture"
                                icon={<FaUserAlt/>}
                                borderRadius={"md"}
                                size={"sm"}
                            />
                            <Text fontSize="md">Meeting with {wardenName}</Text>
                        </HStack>
                        <HStack spacing={"1.2rem"}>
                            <IconButton
                                variant={"outline"}
                                aria-label="Booking Details"
                                icon={<BsClock/>}
                                size={"sm"}
                            />
                            <Text fontSize="md">{dateTime}</Text>
                        </HStack>
                        <HStack spacing={"1.2rem"}>
                            <IconButton
                                variant={"outline"}
                                aria-label="Location"
                                icon={<HiOutlineStatusOnline/>}
                                size={"sm"}
                            />
                            <Button variant={"link"} colorScheme="blue">
                                {mode}
                            </Button>
                        </HStack>
                        <HStack spacing={"1.2rem"}>
                            <IconButton
                                variant={"outline"}
                                aria-label="Location"
                                icon={<FaLocationArrow/>}
                                size={"sm"}
                            />
                            <Button variant={"link"} colorScheme="blue">
                                Open in map
                            </Button>
                        </HStack>
                    </Flex>
                </CardBody>
                <CardFooter p={"1rem"} justifyContent={"center"}>
                    <HStack justifyContent={"space-between"}>
                        <IconButton
                            aria-label="Customer Support Phone Number"
                            icon={<EmailIcon/>}
                            size={"xs"}
                            colorScheme="blue"
                        />
                        <Button fontSize={"sm"} variant={"link"} color={"blackAlpha.800"} fontWeight={"700"}
                                href="chatbothelpdesk@gmail.com">
                            Need Help? Email Us
                        </Button>
                    </HStack>
                </CardFooter>
                <Stopwatch/>
            </Card>
        </>
    );
};

export default ScheduleCard;
