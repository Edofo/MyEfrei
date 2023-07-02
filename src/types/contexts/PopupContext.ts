export interface PopupContextType {
    popup: Popup;
    setPopup: (popup: Popup) => void;
}

export interface PopupProviderType {
    children: JSX.Element;
}

export interface Popup {
    isShow: boolean;
    children: JSX.Element;
}
