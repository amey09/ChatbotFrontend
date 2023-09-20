import { createChatBotMessage } from "react-chatbot-kit";
import InitialButton from "../components/InitialButton";
import CalendarStrip from "../components/CalendarStrip";
import InputField from "../components/InputField";
import ScheduleCard from "../components/ScheduleCard";

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
    },
    {
      widgetName: "ScheduleCard",
      widgetFunc: (props) => <ScheduleCard {...props} />,
    },
    {
      widgetName: "InputField",
      widgetFunc: (props) => <InputField {...props} />,
    },

  ],
};

export default config;
