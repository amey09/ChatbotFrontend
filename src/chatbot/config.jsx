import {createChatBotMessage} from "react-chatbot-kit";
import InitialButton from "../components/InitialButton";
import CalendarStrip from "../components/CalendarStrip";
import ScheduleCard from "../components/ScheduleCard";
import AgeSelector from "../components/AgeSelector";
import ModeSelector from "../components/ModeSelector";

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
            widgetName: "AgeSelector",
            widgetFunc: (props) => <AgeSelector {...props} />,
        },
        {
            widgetName: "ModeSelector",
            widgetFunc: (props) => <ModeSelector {...props} />,
        },
    ],
};

export default config;
