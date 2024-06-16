import React from "react";
import { SvgIcon } from "../../Atomic/SvgIcon/SvgIcon";

export function ChatHeader(): JSX.Element {
    return (
        <div className="header jace-flex jace-justify-between jace-pb-5">
            <div className="sidebar">
                {/* <a href="#" onClick={sidebarToggle}><SvgIcon type="list" fill={"#5A5A5A"} /></a> */}
            </div>
            <div className="jace-text-defaultText">#lobby</div>
            <div className="member-list jace-items-end">
                {/* <a href="#"><SvgIcon type="group" fill={"#5A5A5A"} /></a> */}
            </div>
        </div>
    );
}

