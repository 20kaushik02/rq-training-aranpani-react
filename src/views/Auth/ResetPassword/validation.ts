import * as Yup from "yup";
import { REGEX } from "../../../shared/Regex";

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is Required!")
    .min(8, "Password has to be longer than 8 characters!")
    .matches(
      REGEX.PASSWORD,
      "One Uppercase, One Lowercase, and One Number"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required!")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});
