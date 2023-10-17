import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FcManager} from "react-icons/fc";
import {SiLineageos} from "react-icons/si";
import {
    useBookSessionMutation,
    useGetSessionsQuery,
} from "../slices/sessionsApiSlice";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookSessionModal = ({isOpen, onClose, sessionId, mode}) => {
    const [age, setAge] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [book] = useBookSessionMutation();
    const [showLabel, setShowLabel] = useState(false);
    const [selectedMode, setSelectedMode] = useState(undefined);
    const {refetch} = useGetSessionsQuery();

    const handleSubmit = async () => {
        await book({
            sessionID: sessionId,
            age,
            mode: selectedMode ? selectedMode : undefined,
        }).unwrap();
        toast.success("Booking Successful", {
            position: "bottom-left",
            autoClose: 3000,
        });
        refetch();
    };

    return (
        <>
            <ToastContainer/>
            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                position={"relative"}
                motionPreset="slideInBottom"
            >
                <ModalOverlay
                    bg="none"
                    backdropFilter="auto"
                    backdropInvert="40%"
                    backdropBlur="2px"
                />
                <ModalContent>
                    <ModalHeader>
                        <Flex justify={"space-between"} alignItems={"center"}>
                            <Flex flexDir={"column"} alignItems={"center"} gap={"0.5rem"}>
                                <Text borderBottom={"3px solid grey"} color={"blue.400"}>
                                    Your Details
                                </Text>
                            </Flex>
                            <Button
                                backgroundColor={"gray.400"}
                                size={"md"}
                                onClick={onClose}
                                _hover={{
                                    shadow: "md",
                                    transform: "translateY(-5px)",
                                    transitionDuration: "0.2s",
                                    transitionTimingFunction: "ease-in-out",
                                }}
                            >
                                Cancel
                            </Button>
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex
                            flexDirection={"column"}
                            gap={"1rem"}
                            paddingBottom={"0.5rem"}
                        >
                            <Flex gap={"1rem"}>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FcManager/>
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup gap={"1rem"}>
                                    <InputLeftElement>
                                        <SiLineageos/>
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Enter Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </InputGroup>
                            </Flex>
                            {!showLabel && !mode ? (
                                <Flex justifyContent={"space-evenly"}>
                                    <Button
                                        value={"Online"}
                                        onClick={() => {
                                            setShowLabel((prev) => !prev);
                                            setSelectedMode("Online");
                                        }}
                                        _hover={{
                                            shadow: "md",
                                            transform: "translateY(-5px)",
                                            transitionDuration: "0.2s",
                                            transitionTimingFunction: "ease-in-out",
                                        }}
                                    >
                                        Online
                                    </Button>
                                    <Button
                                        value={"Offline"}
                                        onClick={() => {
                                            setShowLabel((prev) => !prev);
                                            setSelectedMode("Offline");
                                        }}
                                        _hover={{
                                            shadow: "md",
                                            transform: "translateY(-5px)",
                                            transitionDuration: "0.2s",
                                            transitionTimingFunction: "ease-in-out",
                                        }}
                                    >
                                        Offline
                                    </Button>
                                </Flex>
                            ) : null}
                            {showLabel && (
                                <Flex justifyContent={"center"}>
                                    <Button
                                        colorScheme="orange"
                                        color={"blackAlpha.800"}
                                        onClick={() => {
                                            setShowLabel((prev) => !prev);
                                        }}
                                    >
                                        Offline Mode
                                    </Button>
                                </Flex>
                            )}
                            <Button
                                textColor={"white"}
                                backgroundColor={"blue.400"}
                                onClick={handleSubmit}
                            >
                                Book
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default BookSessionModal;
