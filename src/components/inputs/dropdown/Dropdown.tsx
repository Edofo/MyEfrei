import { useState } from "react";

import styles from "./Dropdown.module.scss";

import { DropdownProps } from "@/types/components/input/Dropdown";

const Dropdown = ({ children, onChange, value }: DropdownProps) => {
    const [isShow, setIsShow] = useState(false);

    const handleShow = () => {
        setIsShow(!isShow);
    };

    const handleHide = () => {
        setIsShow(false);
    };

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownButton} onClick={handleShow}>
                {value}
            </div>
            {isShow && (
                <ul tabIndex={0} onBlur={handleHide}>
                    {children &&
                        (Array.isArray(children) ? children : [children]).map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        onChange && onChange(item, index);
                                        handleHide();
                                    }}
                                >
                                    {item}
                                </li>
                            );
                        })}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
