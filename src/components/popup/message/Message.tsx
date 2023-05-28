import { useEffect, useRef } from "react";

import { useMessageContext } from "@/contexts/MessageContext";

import styles from "./Message.module.scss";

import { MessagePopup, MessageType } from "@/types/contexts/MessageContext";

const Message = () => {
    const { message, hideMessage } = useMessageContext();

    const messageRef = useRef<HTMLDivElement>(null);

    const { type, message: messageText } = message as MessagePopup;

    const icon = () => {
        switch (type) {
            case MessageType.ERROR:
                return <i className="fas fa-times"></i>;
            case MessageType.SUCCESS:
                return <i className="fas fa-check"></i>;
            case MessageType.WARNING:
                return <i className="fas fa-exclamation-triangle"></i>;
            default:
                return <i className="fas fa-times"></i>;
        }
    };

    useEffect(() => {
        if (message) {
            const element = messageRef.current;

            setTimeout(() => element?.classList.add(styles.show), 10);

            const timer = setTimeout(() => {
                element?.classList.remove(styles.show);
                setTimeout(hideMessage, 300);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message, hideMessage]);

    return (
        <div ref={messageRef} className={styles.popupMessage}>
            {icon()}
            <p>{messageText}</p>
        </div>
    );
};

export default Message;
