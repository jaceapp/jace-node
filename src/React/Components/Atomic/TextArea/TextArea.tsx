import React from "react";
import { Props } from "./TextArea.types";

export function TextArea(props: Props): JSX.Element {
    return (
        <textarea
            placeholder={props.placeholder}
            className={
                "jace-rounded outline-none jace-h-[60px] jace-resize-none p-4 jace-w-full jace-border-none jace-bg-inputBackground jace-text-white jace-placeholder-placeholderInput"
            }
            onChange={props.onChange}
            rows={props.row}
            onKeyDown={props.onKeyDown}
            value={props.value}
        ></textarea>
    );
}

TextArea.defaultProps = {
    placeholder: "",
};

