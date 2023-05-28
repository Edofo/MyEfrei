export interface MessagePopup {
    isShow: boolean;
    message: string;
    type: MessageType;
}

export interface MessageContexType {
    popup: MessagePopup;
    setPopup: (popup: MessagePopup) => void;
}

export interface MessageProviderType {
    children: JSX.Element;
}

export interface ShowPopup {
    message: string;
    type: MessageType;
}

export enum MessageType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    NULL = "",
}
