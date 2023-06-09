import { useEffect, useRef, useState } from "react";

import styles from "./Dropdown.module.scss";

import { DropdownProps } from "@/types/components/input/Dropdown";

const Dropdown = ({ children, onChange, value, className, defaultButton }: DropdownProps) => {
    const [isShow, setIsShow] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleShow = () => {
        setIsShow(!isShow);
    };

    const handleHide = () => {
        setIsShow(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                handleHide();
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${styles.dropdown} ${className || ""}`} ref={dropdownRef}>
            <button
                className={defaultButton ? styles.dropdownButtonDefault : styles.dropdownButton}
                onClick={handleShow}
            >
                {value}
                {isShow ? (
                    <i className="fas fa-chevron-up" style={{ marginLeft: "5px" }}></i>
                ) : (
                    <i className="fas fa-chevron-down" style={{ marginLeft: "5px" }}></i>
                )}
            </button>
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
