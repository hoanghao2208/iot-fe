import React from "react";
import "./index.scss";

const LoginLayout = ({ children }) => {
    return (
        <div className="wrapper">
            <div className="wrapper__left">{children}</div>
            <div className="wrapper__right"></div>
        </div>
    );
};

export default LoginLayout;
