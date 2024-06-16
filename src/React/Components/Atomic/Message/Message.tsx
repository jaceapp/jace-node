import React from "react";
import { Props } from "./Message.types";
import { formatMessage } from '@Helpers/formatMessage';

export function Message(props: Props): JSX.Element {
    return (
        <div className="jace-flex jace-gap-x-1">
            <span style={{ color: props.color }} className={"font-semibold"}>
                ({props.name})
            </span>{" "}
            {formatMessage(props.text, true)}
        </div>
    );
}

