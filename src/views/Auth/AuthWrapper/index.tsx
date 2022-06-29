import React from "react";
import AuthRouter from "../authRouters";
import "./authWrapper.scss";

const AuthWrapper = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                <p className="title font-light">
                    Welcome back to <span className="font-bold">Aran Pani</span>
                </p>
                <div className="auth-form__container">
                    <AuthRouter />
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper;
