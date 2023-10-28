import {createChatBotMessage} from "react-chatbot-kit";
import InitialButton from "../components/InitialButton";
import CalendarStrip from "../components/CalendarStrip";
import ScheduleCard from "../components/ScheduleCard";
import ModeSelector from "../components/ModeSelector";
import BotAvatar from "../components/BotAvatar";

const config = {
    initialMessages: [
        createChatBotMessage(`Hello, You are about to reschedule your session!`, {
            widget: "Gotit",
        }),
    ],
    customComponents: {
        botAvatar: (props) => <BotAvatar {...props}/>
    },
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
            widgetName: "ModeSelector",
            widgetFunc: (props) => <ModeSelector {...props} />,
        },
    ],
};

export default config;
