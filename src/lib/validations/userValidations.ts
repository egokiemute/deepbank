import * as Yup from "yup";

// Helper function to validate password strength
export const isStrongPassword = (password: string) => {
  // Regex for strong passwords allowing more special characters
  return /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+])[A-Za-z\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+]{8,}$/.test(
    password,
  );
};


// Yup Validation Schema
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .test(
      "not-email",
      "Can't contain your email address",
      function (value) {
        const { email } = this.parent; // Access the email field
        if (!value || !email) return true; // Skip validation if no value or email
        return !value.includes(email);
      },
    )
    .test(
      "min-chars",
      "At least 8 characters",
      (value) => {
        return value ? value.length >= 8 : false;
      },
    )
    .test(
      "number-or-symbol",
      "Contain a number or symbol",
      (value) => {
        return value ? /[\d@$!%*?&]/.test(value) : false;
      },
    )
    .test("strength", "Password strength: Weak", (value) => {
      return value ? isStrongPassword(value) : false;
    })
    .required("Password is required"),
});

export const userDetailsValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Invalid phone number. Include country code (e.g., +234123456789)",
    ),
  skillset: Yup.string()
    .required("Skillset is required")
    // .oneOf(["developer", "designer", "writer", "other"], "Invalid skillset"),
});

export const spaceOwnerDetailsValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  position: Yup.string().required("Position is required"),
  // .oneOf(["developer", "designer", "writer", "other"], "Invalid skillset"),
});

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .test("not-email", "Can't contain your email address", function (value) {
      const { email } = this.parent; // Access the email field
      if (!value || !email) return true; // Skip validation if no value or email
      return !value.includes(email);
    })
    .test("min-chars", "At least 8 characters", (value) => {
      return value ? value.length >= 8 : false;
    })
    .test("number-or-symbol", "Contain a number or symbol", (value) => {
      return value ? /[\d@$!%*?&]/.test(value) : false;
    })
    .test("strength", "Password strength: Weak", (value) => {
      return value ? isStrongPassword(value) : false;
    })
    .required("Password is required"),

  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

