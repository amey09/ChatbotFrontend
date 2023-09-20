import { createChatBotMessage } from "react-chatbot-kit";
import InitialButton from "../components/InitialButton";
import CalendarStrip from "../components/CalendarStrip";

const config = {
  initialMessages: [
    createChatBotMessage(`Hello, Welcome to student info system!`, {
      widget: "Gotit",
    }),
  ],
  widgets: [
    {
      widgetName: "Gotit",
      widgetFunc: (props) => <InitialButton {...props} />,
    },
    {
      widgetName: "CalendarStrip",
      widgetFunc: (props) => <CalendarStrip {...props} />,
    }
  ],
};

export default config;
