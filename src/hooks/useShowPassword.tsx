// create a hooks to show password with icon from fontawesome
//
import { useState } from "react";

const useShowPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return { showPassword, handleShowPassword, icon: showPassword ? "eye-slash" : "eye" };
};

export default useShowPassword;
