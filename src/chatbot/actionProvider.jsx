import {createClientMessage} from "react-chatbot-kit";

import React, {useEffect, useState} from "react";
import {setUserDetails} from "../slices/usersSlice";
import {useDispatch} from "react-redux";

function ActionProvider({createChatBotMessage, setState, children}) {

    const [customSessionData, setCustomSessionData] = useState({
        mode: undefined,
        age: undefined,
        dateTime: undefined,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            customSessionData.age !== undefined &&
            customSessionData.mode !== undefined
        ) {
            dispatch(setUserDetails(customSessionData));
        }
    }, [customSessionData]);

    const initialAction = () => {
        const messages = [
            createClientMessage("Got it!"),
            createChatBotMessage("Pick A Slot!", {
                widget: "CalendarStrip",
            }),
        ];
        updateState(messages);
    };

    const scheduleAction = (props) => {
        const message = `${String(props.date)}, ${String(props.day)}, ${String(
            props.time
        )}`;
        setCustomSessionData((prevData) => ({
            ...prevData,
            dateTime: message,
        }));
        const messages = [createClientMessage(message)];
        updateState(messages);
    };

    const ageSelection = () => {
        const messages = [
            createChatBotMessage("Enter Age", {
                widget: "AgeSelector",
            }),
        ];
        updateState(messages);
    };

    const modeSelection = (age) => {
        const messages = [
            createClientMessage(age),
            createChatBotMessage("Online or Offline?", {
                widget: "ModeSelector",
            }),
        ];
        setCustomSessionData((prevData) => ({
            ...prevData,
            age: age,
        }));
        updateState(messages);
    };

    const scheduleWidgetAction = (mode) => {
        const messages = [
            createClientMessage(mode),
            createChatBotMessage("Successfully Booked", {
                widget: "ScheduleCard",
            }),
        ];
        setCustomSessionData((prevData) => ({
            ...prevData,
            mode: mode,
        }));
        updateState(messages);
    };

    const updateState = (message) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, ...message],
        }));
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        initialAction,
                        scheduleWidgetAction,
                        ageSelection,
                        modeSelection,
                        scheduleAction,
                    },
                });
            })}
        </div>
    );
}

export default ActionProvider;
