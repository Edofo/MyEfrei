export interface DropdownProps {
    children: JSX.Element[] | JSX.Element;
    value: String;
    onChange?: (item: JSX.Element, index: number) => void;
    className?: string;
}
