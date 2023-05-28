import { createContext, useContext, useState } from "react";

import {
    MessageType,
    MessageContexType,
    MessagePopup,
    MessageProviderType,
    ShowPopup,
} from "@/types/contexts/MessageContext";

// create a context
const MessageContext = createContext<MessageContexType | null>(null);

// create a provider
const MessageProvider = ({ children }: MessageProviderType) => {
    const [popup, setPopup] = useState<MessagePopup>({
        isShow: false,
        message: "",
        type: MessageType.NULL,
    });

    return <MessageContext.Provider value={{ popup, setPopup }}>{children}</MessageContext.Provider>;
};

const useMessageContext = () => {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }

    const hideMessage = () => {
        context.setPopup({ isShow: false, message: "", type: MessageType.NULL });
    };

    const showMessage = ({ message, type }: ShowPopup) => {
        context.setPopup({ isShow: true, message, type });
    };

    return { message: context.popup, hideMessage, showMessage, MessageType };
};

export { MessageProvider, useMessageContext };
