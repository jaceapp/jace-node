import React from "react";
import Markdown from 'react-markdown';

// TODO: Grab this from back end
const emojiMap = {
    "LUL": "/images/emojis/LUL.png",
    "Kappa": "Kappa.png",
};

export function formatMessage(text: string, includeMarkdown: boolean) {
    const regex = new RegExp(`(${Object.keys(emojiMap).join('|')})|([^\\s]+)`, "g");
    
    const parts = text.match(regex);

    if (parts === null) {
        return <span>{text}</span>
    }

    return parts.map((part, index) => {
        if (emojiMap[part]) {
            return <img key={index} src={emojiMap[part]} alt={part} title={part} />;
        }

        if (!includeMarkdown) {
            return <span key={index}>{part}</span>;
        }

        return <span key={index}><Markdown>{part}</Markdown></span>;
    });
}
