import { createClientMessage } from "react-chatbot-kit";

import React from "react";

function actionProvider({ createChatBotMessage, setState, children }) {
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
    const message = `${String(props.name)}, ${String(props.age)}`;
    const messages = [createClientMessage(message)];
    updateState(messages);
  };

  const scheduleWidgetAction = () => {
    const messages = [
      createChatBotMessage("Successfully Booked", {
        widget: "ScheduleCard",
      }),
    ];
    updateState(messages);
    console.log("Custom message success");
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

export default actionProvider;
