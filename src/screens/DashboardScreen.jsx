import {Button, Flex, Heading} from "@chakra-ui/react";
import React from "react";
import Dashboard from "../components/Dashboard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteBooking} from "../slices/usersSlice";

const DashboardScreen = () => {
    const {userBookings} = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteBooking = (uuid) => {
        console.log(`Button Clciked`);
        dispatch(deleteBooking(uuid));
    };

    return (
        <Flex flexDir={"column"} padding={"1rem 1rem"} gap={"1rem"}>
            {userBookings && userBookings.length > 0 ? (
                userBookings.map((booking) => (
                    <Dashboard
                        key={booking.id}
                        uuid={booking.id}
                        Day={booking.Day}
                        Time={booking.Time}
                        eventDate={booking.Date}
                        deleteBooking={() => {
                            handleDeleteBooking(booking.id);
                        }}
                    />
                ))
            ) : (
                <>
                    <Heading>No Bookings</Heading>
                    <Flex justifyContent={"space-between"} alignContent={"center"}>
                        <Button
                            colorScheme={"teal"}
                            size={"sm"}
                            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                            onClick={() => navigate("/chat-bot")}
                        >
                            New Booking
                        </Button>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default DashboardScreen;
