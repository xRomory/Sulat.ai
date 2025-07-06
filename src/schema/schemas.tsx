import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Enter a valid email address").required("Valid email is required"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, {
      message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});