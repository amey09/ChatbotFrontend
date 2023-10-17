import {createClientMessage} from "react-chatbot-kit";

import React, {useEffect, useState} from "react";
import {setUserDetails} from "../slices/usersSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    useBookSessionMutation,
    useGetSessionsQuery,
} from "../slices/sessionsApiSlice";

function ActionProvider({createChatBotMessage, setState, children}) {
    const [customSessionData, setCustomSessionData] = useState({
        mode: undefined,
        age: undefined,
        dateTime: undefined,
        rescheduledDateTime: "",
    });
    const dispatch = useDispatch();
    const {sessionInfo} = useSelector((state) => state.users);

    const [book] = useBookSessionMutation();
    const {refetch} = useGetSessionsQuery();

    const updateSession = async () => {
        try {
            await book({
                sessionID: sessionInfo.sessionId,
                datetime: customSessionData.rescheduledDateTime,
                mode: customSessionData.mode,
            }).unwrap();
            refetch();
        } catch (error) {
            throw new Error(error)
        }
        refetch();
    };

    useEffect(() => {
        if (
            customSessionData.age !== undefined &&
            customSessionData.mode !== undefined
        ) {
            dispatch(
                setUserDetails({
                    ...sessionInfo,
                    ...customSessionData,
                })
            );
            updateSession();
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
            rescheduledDateTime: props.rawRescheduledDateTime,
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

    const scheduleWidgetAction = async (mode) => {
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
