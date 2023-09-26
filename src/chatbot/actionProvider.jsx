import {createClientMessage} from "react-chatbot-kit";

import React from "react";
import {setBooking, setUserDetails} from "../slices/usersSlice";
import {useDispatch} from "react-redux";

function ActionProvider({createChatBotMessage, setState, children}) {
    const dispatch = useDispatch()
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
        dispatch(setBooking({Date: props.date, Time: props.time, Day: props.day}))
        const messages = [createClientMessage(message)];
        updateState(messages);
    };

    const userDetailAction = () => {
        const messages = [
            createChatBotMessage("Enter Details", {
                widget: "InputField",
            }),
        ];
        updateState(messages);
    };

    const finalAction = (props) => {
        const message = `${props.name}, ${props.age}`;
        const messages = [createClientMessage(message)];
        dispatch(setUserDetails({name: props.name, age: props.age}))
        updateState(messages);
    };

    const scheduleWidgetAction = () => {
        const messages = [
            createChatBotMessage("Successfully Booked", {
                widget: "ScheduleCard",
            }),
        ];
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
                        finalAction,
                        userDetailAction,
                        scheduleAction,
                    },
                });
            })}
        </div>
    );
}

export default ActionProvider;
