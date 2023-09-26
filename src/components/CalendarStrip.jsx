import React, {useState, useEffect} from "react";
import {Button, Flex, HStack, Text} from "@chakra-ui/react";
import Slider from "react-slick";
import "../styles/slick-theme.css";
import "../styles/slick.css";

const CalendarStrip = (props) => {
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedTimeValue, setSelectedTimeValue] = useState(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);
    const [shouldRender, setShouldRender] = useState(true);
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);

    useEffect(() => {
        if (dateSelected && timeSelected) {
            setTimeout(() => {
                setShouldRender(false);
                props.actions.scheduleAction({
                    date: selectedDateIndex,
                    time: selectedTimeValue,
                    day: selectedDayOfWeek,
                });
                props.actions.userDetailAction();
            }, 4000);
        }
    }, [selectedDateIndex, selectedTimeValue]);

    const DateGenerator = () => {
        const currentDate = new Date();
        const dateRange = [];

        for (let i = 0; i < 14; i++) {
            const targetDate = new Date(currentDate);
            targetDate.setDate(currentDate.getDate() + i);

            const dayNumber = targetDate.getDate();
            const monthName = targetDate.toLocaleDateString("en-US", {
                month: "short",
            });
            const formattedDate = `${dayNumber} ${monthName}`;
            let dayOfWeek = targetDate.toLocaleDateString("en-US", {
                weekday: "short",
            });

            if (i === 0) {
                dayOfWeek = "Today";
            } else if (i === 1) {
                dayOfWeek = "Tomorrow";
            }

            dateRange.push({formattedDate, dayOfWeek});
        }

        return dateRange;
    };

    const dates = DateGenerator();

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
    };

    const generateTimeButtons = (times) => {
        return times.map((time) => (
            <Button
                key={time}
                onClick={() => {
                    setSelectedTimeValue(time);
                    setTimeSelected(true);
                }}
                colorScheme={
                    selectedTimeValue === time ? "blue" : timeSelected ? "gray" : "gray"
                }
                isDisabled={timeSelected}
            >
                {time}
            </Button>
        ));
    };

    const handleSelectedDate = (index) => {
        if (index >= 0 && index < dates.length && !dateSelected) {
            const selectedDate = dates[index];
            setSelectedDateIndex(selectedDate.formattedDate);
            setSelectedDayOfWeek(selectedDate.dayOfWeek);
            setDateSelected(true);
        }
    };

    const morningTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
    const afternoonTimes = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

    return shouldRender ? (
        <Flex flexDirection={"column"} gap={"0.5rem"}>
            <Slider {...settings} style={{padding: "0 3rem"}}>
                {dates.map((date, index) => (
                    <Button
                        size={"md"}
                        key={index}
                        onClick={() => handleSelectedDate(index)}
                        colorScheme={
                            selectedDateIndex === date.formattedDate
                                ? "blue"
                                : dateSelected
                                    ? "gray"
                                    : "gray"
                        }
                        isDisabled={dateSelected}
                    >
                        {date.formattedDate}
                        <br/>
                        {date.dayOfWeek}
                    </Button>
                ))}
            </Slider>
            <Flex
                justifyContent={"flex-start"}
                display={"flex"}
                flexDirection={"column"}
                gap={"0.5rem"}
            >
                <Text>Morning</Text>
                <HStack>{generateTimeButtons(morningTimes)}</HStack>
                <Text>Afternoon</Text>
                <HStack>{generateTimeButtons(afternoonTimes)}</HStack>
            </Flex>
        </Flex>
    ) : null;
};

export default CalendarStrip;
