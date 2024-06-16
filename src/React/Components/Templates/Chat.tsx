import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SvgIcon } from "../Atomic/SvgIcon/SvgIcon";
import { BannedScreen } from "@Components/Templates/BannedScreen/BannedScreen";
import { Props } from "./Chat.types";
import { webRouteConfig, apiRouteConfig } from "@Global/routeConfig";
import { useConfigStore } from "@Stores/configStore";
import { MessageTypeEnum } from "@Enums/MessageTypeEnum";
import { UserStatusEnum } from "@Enums/UserStatusEnum";
import { useUserStore } from "@Stores/userStore";
import { useMessageStore } from "@Stores/messageStore";
import { useChatConnection } from "@Hooks/useChatConnection";
import axios from "axios";

export function Chat({ children, ...props }: Props): JSX.Element {
    const updateUser = useUserStore((state) => state.updateUser);
    const { uid, username, color, status, type } = useUserStore((state) => ({
        uid: state.uid,
        username: state.username,
        color: state.color,
        status: state.status,
        type: state.type,
    }));
    const routes = useConfigStore((state) => state.routes);
    const setRoutes = useConfigStore((state) => state.setRoutes);

    function startChat() {
        if (Object.keys(routes).length === 0) return;
        try {
            axios.post(routes.yaceChatStart).then((response) => {
                let selfUser = response.data.self;

                updateUser({
                    uid: selfUser.uid,
                    username: selfUser.username,
                    color: selfUser.color,
                    status: selfUser.status,
                    type: selfUser.type,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Save chat configs to store
     */
    function saveConfigs() {
        setRoutes(props.config.api ? apiRouteConfig : webRouteConfig);
    }

    // Establish Websocket
    useChatConnection({ uid });

    useEffect(() => {
        saveConfigs();
        startChat();
    }, [routes]);

    if (status === UserStatusEnum.BANNED) {
        return <BannedScreen />;
    }

    return (
        <div className="relative">
            <div className="member update"></div>
            <div className="jace-bg-chatBackground jace-h-screen">
                <div className="chat jace-h-screen jace-flex jace-flex-col jace-p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}

Chat.defaultProps = {
    config: {
        api: false,
    },
};
