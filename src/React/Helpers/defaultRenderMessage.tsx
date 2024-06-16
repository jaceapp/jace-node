import { MessagesTypes } from "../Components/Molecules/Messages/Messages.types";
import React from "react";
import { Message } from "@Components/Atomic/Message/Message";

export function defaultRenderMessage(message: MessagesTypes): JSX.Element {
    return (
        <Message
            name={message.username}
            color={"#" + message.color}
            text={message.text}
        />
    );
}
