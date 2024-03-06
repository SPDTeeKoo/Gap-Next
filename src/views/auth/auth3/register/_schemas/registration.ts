import { InferType, object, ref, string } from "yup";

export const registrationFormSchema = object({
  firstName: string().max(30, "Too Long!").required("Firstname is required."),
  lastName: string().max(30, "Too Long!").required("Lastname is required."),
  email: string()
    .max(70, "Too Long!")
    .email("Invalid email address.")
    .required("Email is required."),
  userType: string().required("userType is required."),
  companyName: string(),
  password: string()
    .min(8, "At least 8 characters")
    .max(50, "Too Long!")
    .required("Password is required."),
  verifypassword: string()
    .oneOf([ref("password")], "Password mismatch")
    .required("Re-password is required."),
});

export type registrationFormData = InferType<typeof registrationFormSchema>;
