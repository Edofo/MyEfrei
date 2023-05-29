export interface DropdownProps {
    children: JSX.Element[] | JSX.Element;
    onChange?: (item: JSX.Element, index: number) => void;
    value: String;
}
