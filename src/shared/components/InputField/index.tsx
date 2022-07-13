import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from 'antd';
import Error from "../Error";

interface InputFieldProps {
    title?: string;
    type: string;
    name: string;
    placeholder: string;
    prefix?: any;
    className?: string;
    disabled?: boolean;
    onChange?: Function;
}

const InputField: FC<InputFieldProps> = (props) => {
    const { name, title, type } = props;
    return (
        <div className="mb-1">
            {title && <label htmlFor={name}>{title}</label>}
            <Field className="input-field" as={type === "password" ? Input.Password : Input} {...props} />
            <ErrorMessage name={name}>
                {(message: string) => <Error message={message} />}
            </ErrorMessage>
        </div>
    )
}

export default InputField;