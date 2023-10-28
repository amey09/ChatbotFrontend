import React, {useState, useMemo, useEffect} from "react";
import {Button, Flex, HStack, Text} from "@chakra-ui/react";
import Slider from "react-slick";
import "../styles/slick-theme.css";
import "../styles/slick.css";
import {
    dateRegexFormatter,
    formatTime,
    generateTimeRange,
} from "../utils/dateFormatter";

const CalendarStrip = (props) => {
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedTimeValue, setSelectedTimeValue] = useState(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);
    const [shouldRender, setShouldRender] = useState(true);
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [selectedRawDate, setSelectedRawDate] = useState(undefined);
    const [selectedRawTime, setSelectedRawTime] = useState(undefined);

    const rawDateRange = [];

    const memoizedRawDate = useMemo(() => selectedRawDate, [selectedRawDate]);
    const memoizedRawTime = useMemo(() => selectedRawTime, [selectedRawTime]);

    useEffect(() => {
        if (memoizedRawDate && memoizedRawTime) {
            const timeout = setTimeout(() => {
                console.log(`Timeout Run`);
                setShouldRender(false);
                props.actions.scheduleAction({
                    date: selectedDateIndex,
                    time: selectedTimeValue,
                    day: selectedDayOfWeek,
                    rawRescheduledDateTime: `${memoizedRawDate}${memoizedRawTime}`,
                });
                props.actions.modeSelection();
                setSelectedRawDate(undefined);
                setSelectedRawTime(undefined);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [memoizedRawDate, memoizedRawTime, selectedDateIndex, selectedTimeValue, selectedDayOfWeek, props.actions]);


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

            rawDateRange.push(targetDate);
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

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const handleSelectedDate = (index) => {
        if (index >= 0 && index < dates.length && !dateSelected) {
            const selectedDate = dates[index];
            setSelectedRawDate(dateRegexFormatter(rawDateRange[index]));
            setSelectedDateIndex(selectedDate.formattedDate);
            setSelectedDayOfWeek(selectedDate.dayOfWeek);
            setDateSelected(true);
        }
    };

    const morningTimes = generateTimeRange(9, 12, 60);
    const afternoonTimes = generateTimeRange(14, 17, 60);

    const generateTimeButtons = (times) => {
        return times.map((time) => {
            const {formatted, value} = formatTime(time);

            return (
                <Button
                    key={time}
                    onClick={() => {
                        setSelectedTimeValue(formatted);
                        setTimeSelected(true);
                        setSelectedRawTime(value);
                    }}
                    colorScheme={
                        selectedTimeValue === time ? "blue" : timeSelected ? "gray" : "gray"
                    }
                    isDisabled={timeSelected}
                >
                    {formatted}
                </Button>
            );
        });
    };

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
                <HStack justifyContent={"space-evenly"}>{generateTimeButtons(morningTimes)}</HStack>
                <Text>Afternoon</Text>
                <HStack justifyContent={"space-evenly"}>{generateTimeButtons(afternoonTimes)}</HStack>
            </Flex>
        </Flex>
    ) : null;
};

export default CalendarStrip;
