import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from "@chakra-ui/react";
import React, {useState} from "react";
import Dashboard from "../components/Dashboard";
import {useSelector} from "react-redux";
import {useDeleteSessionMutation, useGetSessionsQuery,} from "../slices/sessionsApiSlice";
import formatLocalDate from "../utils/dateFormatter";
import {AddIcon} from "@chakra-ui/icons";
import CreateSessionModal from "../components/CreateSessionModal";
import {toast, ToastContainer} from "react-toastify";

const DashboardScreen = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const {data: sessions} = useGetSessionsQuery();
    const {isWarden} = useSelector((state) => state.auth.userInfo) || {
        isWarden: false,
    };
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [deleteSession] = useDeleteSessionMutation();
    const {refetch} = useGetSessionsQuery();

    const handleDeleteBooking = async (sessionID) => {
        try {
            await deleteSession({sessionID}).unwrap();
            toast.success("Session Deleted", {
                position: "bottom-left",
                autoClose: 3000,
            });
            refetch();
        } catch (error) {
            throw new Error(error)
        }
    };

    const handleTabChange = (index) => {
        setTabIndex(index);
    };

    return (
        <Flex flexDir={"column"} minHeight={"90svh"}>
            <ToastContainer/>
            <Tabs
                position={"relative"}
                colorScheme="grey"
                isLazy={true}
                index={tabIndex}
                onChange={handleTabChange}
            >
                <TabList
                    justifyContent={"space-around"}
                    position={"sticky"}
                    top={"10svh"}
                    backgroundColor={"white"}
                    zIndex={800}
                >
                    {sessions &&
                        typeof sessions === "object" &&
                        Object.keys(sessions)
                            .slice(1)
                            .map((session, index) => <Tab key={index}>{session}</Tab>)}
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                />
                <TabPanels>
                    {sessions &&
                        Object.entries(sessions)
                            .slice(1)
                            .map(([sessionName, sessions]) => {
                                if (Array.isArray(sessions) && sessions.length > 0) {
                                    return (
                                        <TabPanel key={sessionName}>
                                            <Flex flexDir={"column"} gap={"1rem"}>
                                                {sessions.map((session) => (
                                                    <Dashboard
                                                        key={session._id}
                                                        sessionName={sessionName}
                                                        wardenName={session.wardenName}
                                                        clientName={session.clientName}
                                                        dateTime={formatLocalDate(session.datetime)}
                                                        rawDate={session.datetime}
                                                        mode={session.mode}
                                                        isWarden={isWarden}
                                                        sessionId={session._id}
                                                        deleteBooking={() =>
                                                            handleDeleteBooking(session._id)
                                                        }
                                                    />
                                                ))}
                                            </Flex>
                                        </TabPanel>
                                    );
                                } else {
                                    return (
                                        <TabPanel
                                            key={sessionName}
                                            justifyContent={"center"}
                                            display={"flex"}
                                            minH={"79.8svh"}
                                            textAlign={"center"}
                                            position={"relative"}
                                        >
                                            <Flex
                                                gap={"1rem"}
                                                flexDir={"column"}
                                                maxW={"fit-content"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Heading>
                                                    {isWarden
                                                        ? "No Sessions"
                                                        : "You have no scheduled sessions"}
                                                </Heading>
                                                <Button
                                                    variant={"ghost"}
                                                    colorScheme={"teal"}
                                                    size={"sm"}
                                                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                                                    maxW={"fit-content"}
                                                    onClick={() => setTabIndex(1)}
                                                >
                                                    Book a session?
                                                </Button>
                                            </Flex>
                                        </TabPanel>
                                    );
                                }
                            })}
                </TabPanels>
            </Tabs>
            <Box
                position={"fixed"}
                bottom={"1rem"}
                left={"50%"}
                transform={"translateX(-50%)"}
            >
                {isWarden ? (
                    <>
                        <IconButton
                            zIndex={"100"}
                            maxW={"fit-content"}
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            icon={<AddIcon/>}
                            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                            onClick={onOpen}
                            _hover={{
                                shadow: "md",
                                transform: "translateY(-5px)",
                                transitionDuration: "0.2s",
                                transitionTimingFunction: "ease-in-out",
                            }}
                        />
                        <CreateSessionModal onClose={onClose} onOpen={onOpen} isOpen={isOpen}/>
                    </>
                ) : null}
            </Box>
        </Flex>
    );
};

export default DashboardScreen;
