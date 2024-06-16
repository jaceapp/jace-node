import React from "react";

export function BannedScreen() {
    return (
        <div className="relative">
            <div className="jace-bg-chatBackground">
                <div className="chat jace-h-screen jace-flex jace-flex-col jace-items-center jace-justify-center jace-p-5">
                    <div className="jace-text-defaultText">
                        <h2>You're banned from Chat.</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
