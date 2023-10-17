import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Text,
    ModalOverlay,
    Flex,
    Button,
    Switch,
    Box,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import {BsCalendar3, BsClockFill} from "react-icons/bs";
import React, {useState} from "react";
import {Calendar} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
    dateRegexFormatter,
    formatDateToCustomString,
} from "../utils/dateFormatter";
import {
    useCreateSessionMutation,
    useGetSessionsQuery,
} from "../slices/sessionsApiSlice";
import {toast, ToastContainer} from "react-toastify";

const CreateSessionModal = ({isOpen, onClose}) => {
    const ChildModal = () => {
        const [isDateChecked, setIsDateChecked] = useState(false);
        const [isTimeChecked, setIsTimeChecked] = useState(false);
        const [selectedTime, setSelectedTime] = useState({
            hours: undefined,
            minutes: undefined,
        });
        const [selectedDate, setSelectedDate] = useState(null);
        const [selectedMode, setSelectedMode] = useState(undefined);
        const [defaultTimeCheckedValue, setdefaultTimeCheckedValue] =
            useState(false);
        const [defaultDateCheckedValue, setdefaultDateCheckedValue] =
            useState(false);
        const [showLabel, setShowLabel] = useState(false);

        const [create] = useCreateSessionMutation();
        const {refetch} = useGetSessionsQuery();

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);

        const handleCreateSession = async () => {
            const rawSelectedDate = dateRegexFormatter(selectedDate);

            try {
                await create({
                    datetime: `${rawSelectedDate}${selectedTime.hours}:${selectedTime.minutes}`,
                    mode: selectedMode,
                }).unwrap();
                toast.success("Session Created", {
                    position: "bottom-left",
                    autoClose: 3000,
                });
                refetch();
                onClose();
            } catch (error) {
                throw new Error(error);
            }
        };

        const handleDateCheck = () => {
            setIsDateChecked((prev) => !prev);
            setdefaultDateCheckedValue(true);
            setSelectedDate(currentDate);
            if ((selectedDate && isTimeChecked) || (selectedDate && !isTimeChecked)) {
                setSelectedDate(null);
                setIsDateChecked(false);
                setIsTimeChecked(false);
                setSelectedTime({hours: undefined, minutes: undefined});
                setdefaultDateCheckedValue(false);
                setdefaultTimeCheckedValue(false);
            }

            if (isDateChecked) {
                setdefaultTimeCheckedValue(false);
                setSelectedTime({hours: undefined, minutes: undefined});
                setIsTimeChecked(false);
            }
        };

        const handleTimeCheck = () => {
            if (!selectedDate) {
                setSelectedDate(currentDate);
            }
            setdefaultDateCheckedValue(true);
            setdefaultTimeCheckedValue((prevValue) => !prevValue);
            setIsTimeChecked((prevValue) => !prevValue);
            setSelectedTime({hours: 10, minutes: "00"});
            if (selectedTime) {
                setSelectedTime({hours: undefined, minutes: undefined});
            }
        };

        return (
            <>
                <ToastContainer/>
                <Flex width={"100%"} flexDirection={"column"} gap={"0.5rem"}>
                    <Box>
                        <Flex justify={"space-between"} alignItems={"center"} gap={"1rem"}>
                            <BsCalendar3 size={"25"} color="red"/>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                                padding={"0.5rem 0"}
                                borderBottom="2px solid grey"
                                borderColor="gray.300"
                            >
                                <Flex flexDir={"column"}>
                                    <Text fontSize="xl">Date</Text>
                                    <Text fontSize={"md"} textColor={"blue.400"}>
                                        {selectedDate
                                            ? formatDateToCustomString(selectedDate)
                                            : null}
                                    </Text>
                                </Flex>
                                <Switch
                                    id="isDateChecked"
                                    size="lg"
                                    isChecked={defaultDateCheckedValue}
                                    onChange={handleDateCheck}
                                />
                            </Flex>
                        </Flex>
                        {isDateChecked && !isTimeChecked ? (
                            <Flex flexDir={"column"}>
                                <Calendar
                                    rangeColors={["#FD5861"]}
                                    date={selectedDate}
                                    onChange={(selectedDate) => setSelectedDate(selectedDate)}
                                    minDate={currentDate}
                                />
                            </Flex>
                        ) : null}
                    </Box>
                    <Box>
                        <Flex justify={"space-between"} alignItems={"center"} gap={"1rem"}>
                            <BsClockFill size={"25"} color="skyblue"/>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                                padding={"0.5rem 0"}
                                borderBottom="2px solid grey"
                                borderColor="gray.300"
                            >
                                <Flex flexDir={"column"}>
                                    <Text fontSize="xl">Time</Text>
                                    <Text fontSize={"md"} textColor={"blue.400"}>
                                        {selectedTime.hours && selectedTime.minutes
                                            ? `${selectedTime.hours}:${selectedTime.minutes}`
                                            : null}
                                    </Text>
                                </Flex>
                                <Switch
                                    id="isTimeChecked"
                                    size="lg"
                                    isChecked={defaultTimeCheckedValue}
                                    onChange={handleTimeCheck}
                                />
                            </Flex>
                        </Flex>
                        {isTimeChecked ? (
                            <Flex flexDir={"column"}>
                                <InputGroup gap={"0.5rem"} paddingTop={"0.8rem"}>
                                    <InputLeftElement/>
                                    <Select
                                        colorScheme="teal"
                                        value={selectedTime.hours}
                                        placeholder="Hour"
                                        onChange={(event) => {
                                            setSelectedTime({
                                                ...selectedTime,
                                                hours: event.target.value,
                                            });
                                        }}
                                    >
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                    </Select>
                                    <Select
                                        value={selectedTime.minutes}
                                        placeholder="Minute"
                                        onChange={(event) => {
                                            setSelectedTime({
                                                ...selectedTime,
                                                minutes: event.target.value,
                                            });
                                        }}
                                    >
                                        <option value="00">00</option>
                                        <option value="30">30</option>
                                    </Select>
                                </InputGroup>
                            </Flex>
                        ) : null}
                    </Box>
                    {selectedDate &&
                    selectedTime.hours &&
                    selectedTime.minutes &&
                    !showLabel ? (
                        <Flex justifyContent={"space-evenly"}>
                            <Button
                                color={"blackAlpha.800"}
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
                                color={"blackAlpha.800"}
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
                                color={"blackAlpha.800"}
                                onClick={() => setShowLabel((prev) => !prev)}
                            >
                                {selectedMode}
                            </Button>
                        </Flex>
                    )}
                    {selectedDate && selectedTime.hours && selectedTime.minutes ? (
                        <Button
                            backgroundColor={"blue.400"}
                            textColor={"white"}
                            size={"md"}
                            onClick={handleCreateSession}
                            _hover={{
                                shadow: "md",
                                transform: "translateY(-5px)",
                                transitionDuration: "0.2s",
                                transitionTimingFunction: "ease-in-out",
                            }}
                        >
                            Create
                        </Button>
                    ) : null}
                </Flex>
            </>
        );
    };

    return (
        <>
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
                <ModalContent paddingBottom={"0.5rem"}>
                    <ModalHeader>
                        <Flex justify={"space-between"} alignItems={"center"}>
                            <Flex flexDir={"column"} alignItems={"center"} gap={"0.5rem"}>
                                <Text borderBottom={"3px solid grey"} color={"blue.400"}>
                                    New Session
                                </Text>
                            </Flex>
                            <Button
                                backgroundColor={"gray.400"}
                                textColor={"white"}
                                onClick={onClose}
                                size={"md"}
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
                        <Flex flexDirection={"column"}>
                            <Flex flexDirection={"column"} position={"relative"}>
                                <ChildModal/>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateSessionModal;
