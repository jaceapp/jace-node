/// <reference types="react" />
import { Props } from "./Chat.types";
export declare function Chat({ children, ...props }: Props): JSX.Element;
export declare namespace Chat {
    var defaultProps: {
        config: {
            api: boolean;
        };
    };
}
