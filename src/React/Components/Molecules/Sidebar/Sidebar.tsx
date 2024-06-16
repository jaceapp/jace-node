import React, { useState } from "react";
import { SvgIcon } from "../../Atomic/SvgIcon/SvgIcon";

// TODO: Just one big todo. States should be managed globally
export function Sidebar(): JSX.Element {
    const [sidebar, setSidebar] = useState(false);

    function closeOverlay() {
        setSidebar(false);
    }

    function sidebarToggle() {
        setSidebar(true);
    }

    return (
        <>
            <div className="sidebar absolute jace-z-20 jace-left-0 jace-top-0 jace-h-screen jace-text-defaultText jace-bg-menuBackground jace-w-3/4 md:jace-w-2/4">
                <div className="header jace-text-center jace-p-3">
                    <h2 className="jace-text-xl jace-font-bold">
                        SteamCompanion
                    </h2>
                </div>
                <div className="channel-list">
                    <h5 className="jace-font-bold">General Chat</h5>
                    <ul>
                        <li>
                            <a href="#" className="jace-flex items-center">
                                <SvgIcon type="hash" fill={"#5A5A5A"} /> lobby
                            </a>
                        </li>
                        <li>
                            <a href="#" className="jace-flex items-center">
                                <SvgIcon type="hash" fill={"#5A5A5A"} /> general
                            </a>
                        </li>
                        <li>
                            <a href="#" className="jace-flex items-center">
                                <SvgIcon type="hash" fill={"#5A5A5A"} />{" "}
                                off-topic
                            </a>
                        </li>
                        <li>
                            <a href="#" className="jace-flex items-center">
                                <SvgIcon type="hash" fill={"#5A5A5A"} /> gaming
                            </a>
                        </li>
                        <li>
                            <a href="#" className="jace-flex items-center">
                                <SvgIcon type="lock" fill={"#5A5A5A"} />{" "}
                                development
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="overlay absolute jace-z-10 jace-top-0 jace-left-0 jace-bg-red jace-h-screen jace-w-screen block"
                onClick={closeOverlay}
            ></div>
        </>
    );
}

export default Sidebar;
