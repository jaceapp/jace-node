import React from "react";
import { Props } from "./InfoMessage.types";

export function InfoMessage(props: Props): JSX.Element {
    return <div className="jace-text-[#545454] jace-italic">{props.text}</div>;
}
