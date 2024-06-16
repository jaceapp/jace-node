import React, { useState, useEffect, useRef } from "react";
// import { Message } from "@Components/Atomic/Message/Message";
import { MessagesTypes } from "./Messages.types";
import { InfoMessage } from "@Components/Atomic/InfoMessage/InfoMessage";
import { useMessageStore } from "@Stores/messageStore";
// import { defaultRenderMessage } from "@Helpers/defaultRenderMessage";
import { defaultRenderMessage } from "../../../Helpers/defaultRenderMessage";
import Markdown from 'react-markdown';

export function Messages(props: any): JSX.Element {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const messages = useMessageStore((state) => state.messages);
    const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

    const handleScroll = () => {
        if (containerRef.current) {
            const isScrolledToBottom =
                containerRef.current.scrollHeight -
                    containerRef.current.scrollTop <=
                containerRef.current.clientHeight + 50;
            setIsUserScrolledUp(!isScrolledToBottom);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener(
                    "scroll",
                    handleScroll,
                );
            }
        };
    }, []);

    useEffect(() => {
        if (!isUserScrolledUp && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isUserScrolledUp]);

    return (
        <div
            className="messages jace-break-words jace-text-defaultText jace-flex-grow jace-overflow-y-auto jace-leading-7 p-2"
            ref={containerRef}
        >
            {messages && (
                <>
                    {messages.map((message: any) => {
                        const isDeleted = message.is_deleted === true;
                        if (isDeleted) {
                            return <InfoMessage text="Message was deleted." />;
                        }

                        if (message.type === "information") {
                            return <InfoMessage text={message.text} />;
                        }

                        return props.renderMessage(message);
                    })}
                </>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

Messages.defaultProps = {
    renderMessage: defaultRenderMessage,
}
