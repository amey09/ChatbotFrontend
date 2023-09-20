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
            initialAction
          },
        });
      })}
    </div>
  );
}

export default actionProvider;
