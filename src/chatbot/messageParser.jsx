import React from "react";
import {useDispatch} from "react-redux";
import {setMessage} from "../slices/messagesSlice";

function MessageParser({children, actions}) {
    const messages = children.props.state.messages;
    const dispatch = useDispatch()
    messages.forEach((message) => {
        dispatch(setMessage(message));
    });

    const parse = (message) => {
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
}

export default MessageParser;
