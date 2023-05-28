import { createContext, useContext, useState } from "react";

import { Popup, PopupContextType, PopupProviderType } from "@/types/contexts/PopupContext";

// create a context
const PopupContext = createContext<PopupContextType | null>(null);

// create a provider
const PopupProvider = ({ children }: PopupProviderType) => {
    const [popup, setPopup] = useState<Popup>({
        isShow: false,
        children: null,
    });

    return <PopupContext.Provider value={{ popup, setPopup }}>{children}</PopupContext.Provider>;
};

const usePopupContext = () => {
    const context = useContext(PopupContext);

    if (!context) {
        throw new Error("usePopupContext must be used within a PopupProvider");
    }

    const hidePopup = () => {
        context.setPopup({
            isShow: false,
            children: null,
        });
    };

    const showPopup = (popup: JSX.Element) => {
        context.setPopup({
            isShow: true,
            children: popup,
        });
    };

    return { popup: context.popup, hidePopup, showPopup };
};

export { PopupProvider, usePopupContext };
