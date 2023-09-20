import { Button, IconButton } from "@chakra-ui/button";
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
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ScheduleCard = (props, date, time) => {
  const [countdown, setCountdown] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        // navigate("/dashboard");
        clearInterval(countdownInterval);
      }
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, navigate]);

  return (
    <>
      <Card
        minWidth={"200px"}
        backgroundColor={"white"}
        boxShadow="lg"
        rounded="md"
        maxHeight={"300px"}
      >
        <CardHeader
          textColor={"teal.700"}
          fontWeight={"600"}
          fontSize="lg"
          p={"1rem"}
        >
          Session scheduled successfully
        </CardHeader>
        <CardBody p={"1rem"}>
          <Flex flexDir={"column"} gap={"0.5rem"} width={"100%"}>
            <HStack spacing={"1.2rem"}>
              <IconButton
                icon={<AiOutlineUser />}
                borderRadius={"md"}
                size={"sm"}
              />
              <Text fontSize="md">Dr Reddy</Text>
            </HStack>
            <HStack spacing={"1.2rem"}>
              <IconButton icon={<CiTimer />} size={"sm"} />
              <Text fontSize="md">Date-Time</Text>
            </HStack>
            <HStack spacing={"1.2rem"}>
              <IconButton icon={<IoLocationSharp />} size={"sm"} />
              <Button variant={"link"} colorScheme="blue">
                Open in map
              </Button>
            </HStack>
          </Flex>
        </CardBody>
        <CardFooter p={"1rem"}>
          <HStack>
            <IconButton
              icon={<AiOutlinePhone />}
              size={"xs"}
              colorScheme="teal"
            />
            <Text fontSize={"xs"}>Need Help? +91 9063293050 (Abhijeet)</Text>
          </HStack>
        </CardFooter>
      </Card>
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
    </>
  );
};

export default ScheduleCard;
