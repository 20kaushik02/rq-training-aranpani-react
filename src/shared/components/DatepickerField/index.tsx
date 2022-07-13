import React, { FC } from 'react'
import "./datepickerField.scss"
import { DatePicker } from "antd";
import { ErrorMessage, Field } from "formik";
import Error from "../Error";

interface DatepickerFieldProps {
    name: string;
    title?: string;
    placeholder?: string;
    value?: any;
    onChange?: (value: any, dateString: any) => void;
    disabled?: boolean;
    className?: string;
}

const DatepickerField: FC<DatepickerFieldProps> = (props) => {
    const {
        name,
        title,
        placeholder,
        onChange,
        value,
        disabled,
        className
    } = props;

    return (
        <Field name={name}>
            {() => {
                return (
                    <div className={`datepicker-field`}>
                        {title && (
                            <div className="dropdown-field__title">{title}</div>
                        )}
                        <DatePicker format="DD/MM/YYYY"
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value ?? null}
                            disabled={disabled}
                            className={className}

                        />
                        <ErrorMessage name={name}>
                            {(message: string) => <Error message={message} />}
                        </ErrorMessage>
                    </div>)
            }}
        </Field>
    )
}

export default DatepickerField;