import {
    Button,
    Flex,
    Heading,
    VStack,
    Text,
    useDisclosure,
    Box,
} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";
import BookSessionModal from "./BookSessionModal";
import {useDispatch} from "react-redux";
import {setUserDetails} from "../slices/usersSlice";
import {FcManager} from "react-icons/fc";
import ActionModal from "./ActionModal";

function Dashboard({
                       dateTime,
                       wardenName,
                       clientName,
                       mode,
                       deleteBooking,
                       isWarden,
                       sessionName,
                       sessionId,
                       rawDate,
                   }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <Flex
                borderLeft={"5px solid skyblue"}
                boxShadow={"md"}
                dropShadow={"md"}
                padding={"0 1rem 0 1rem"}
                flexWrap="nowrap"
                position="relative"
            >
                <Flex
                    alignItems={"left"}
                    padding={"0.5rem 0"}
                    gap={"1rem"}
                    flexDir={"column"}
                    flex={1}
                >
                    <VStack alignItems={"flex-start"} gap={"0.3em"}>
                        {isWarden ? (
                            <Heading fontSize={"1.2rem"}>
                                <Flex alignItems={"center"} gap={"0.5rem"}>
                                    <FcManager/>
                                    {clientName ? `${clientName}` : `Not Booked`}
                                </Flex>
                            </Heading>
                        ) : (
                            <Heading fontSize={"1.2rem"}>
                                <Flex alignItems={"center"} gap={"0.5rem"}>
                                    <FcManager/>
                                    {wardenName ? `${wardenName}` : null}
                                </Flex>
                            </Heading>
                        )}
                        <Text fontWeight={"medium"} color={"orange"}>
                            {mode ? mode : `Online / Offline`}
                        </Text>
                        <Text fontWeight={"medium"}>{dateTime}</Text>
                    </VStack>
                    <Flex
                        justifyContent={"space-between"}
                        alignContent={"center"}
                        borderTop={"2px solid grey"}
                        paddingTop={"0.5rem"}
                    >
                        <Button
                            size={"sm"}
                            colorScheme={"blue"}
                            onClick={() => {
                                dispatch(
                                    setUserDetails({
                                        oldRawDate: rawDate,
                                        wardenName: wardenName,
                                        sessionId: sessionId,
                                    })
                                );

                                navigate("/chat-bot");
                            }}
                        >
                            {(!isWarden && sessionName === "bookedSessions") || isWarden
                                ? `Reschedule`
                                : `Custom Time?`}
                        </Button>
                        {(!isWarden && sessionName === "availableSessions") ||
                        (!isWarden && sessionName === "bookedSessions") ? null : (
                            <>
                                <ActionModal
                                    alertTitle={"Delete"}
                                    alertDialogue={
                                        "Are you sure? You can't undo this action afterwards."
                                    }
                                    modalActionBtnTitle={"Delete"}
                                    handleModalAction={deleteBooking}
                                    onClose={onClose}
                                    isOpen={isOpen}
                                />
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    colorScheme={"red"}
                                    onClick={onOpen}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}

                        {!isWarden && sessionName === "availableSessions" ? (
                            <Box>
                                <BookSessionModal
                                    onClose={onClose}
                                    isOpen={isOpen}
                                    sessionId={sessionId}
                                    dispatch={dispatch}
                                    mode={mode}
                                />
                                <Button
                                    colorScheme={"teal"}
                                    size={"sm"}
                                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                                    onClick={onOpen}
                                >
                                    Book
                                </Button>
                            </Box>
                        ) : null}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export default Dashboard;
