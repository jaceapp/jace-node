import React from "react";
import { SvgIcon } from "@Components/Atomic/SvgIcon/SvgIcon";
import { Editor } from "@Components/Molecules/Editor/Editor";
import { TextArea } from "@Components/Atomic/TextArea/TextArea";
import { MessageTypeEnum } from "@Enums/MessageTypeEnum";
import { useConfigStore } from "@Stores/configStore";
import { useMessageStore } from "@Stores/messageStore";
import axios from "axios";

export function MessageBox(props: any): JSX.Element {
    const routes = useConfigStore((state) => state.routes);
    const [message, setMessage] = React.useState<string>("");
    const addMessage = useMessageStore((state) => state.addMessage);

    function adjustTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        try {
            const textarea = e.target;
            const lineHeight = 30; // Adjust this based on your textarea's styling
            const maxLines = 3; // Maximum number of lines
            const minLines = 1; // Minimum number of lines

            // Reset height to ensure scrollHeight is accurate
            textarea.style.height = "auto";

            // Calculate new height based on content and limit to maxLines
            const newHeight = Math.min(
                textarea.scrollHeight,
                lineHeight * maxLines,
            );

            // Ensure the height is not less than minLines
            textarea.style.height = `${Math.max(newHeight, lineHeight * minLines)}px`;

            setMessage(e.target.value);
        } catch (error) {
            console.error(error);
        }
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        try {
            // If enter is pressed without shift key, then send it off, and clear text
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault(); // Prevents a new line`

                // Send message
                axios
                    .post(routes.yaceChatSendmessage, { message: message })
                    .then((response) => {
                        if (response.data.type === MessageTypeEnum.COMMAND) {
                            addMessage({
                                type: "information",
                                text: response.data.message,
                            });
                        }
                        setMessage("");
                    });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="chat-message relative jace-pt-3 jace-text-white">
            <Editor />
            {/* <TextArea */}
            {/*     placeholder="Message #lobby" */}
            {/*     onChange={adjustTextarea} */}
            {/*     onKeyDown={handleKeyPress} */}
            {/*     value={message} */}
            {/* /> */}
            <div className="icon jace-absolute jace-bottom-5 jace-right-3">
                <a href="#">
                    <SvgIcon type="emoji" fill={"#5A5A5A"} />
                </a>
            </div>
        </div>
    );
}
