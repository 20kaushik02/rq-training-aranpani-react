import * as Yup from "yup";

export const ForgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is Required!")
        .email("Enter a valid email"),
})