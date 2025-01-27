import { verificationToken } from "@/utils/Helpers";
import sendEmail from "./emailService";
import {
  ORDER_CONFIRMATION_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates";

// Define types for parameters and any other necessary types (if applicable)
export const sendVerificationEmail = async (
  email: string,
  // verificationToken: string,
): Promise<void> => {
  const subject = "Verify your email";
  // Ensure correct replacement
  const html = VERIFICATION_EMAIL_TEMPLATE(verificationToken)

  try {
    // Explicitly passing the `html` field in the email
    const response = await sendEmail(email, subject, html);
    console.log("Email sent successfully", response);
  } catch (error: unknown) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (
  email: string,
  firstname: string,
  lastname: string,
): Promise<void> => {
  const subject = "Welcome to Flextable";
  // ensure correct replacement
  const html = WELCOME_EMAIL_TEMPLATE(firstname, lastname);

  try {
    // Explicitly passing the `html` field in the email
    const response = await sendEmail(email, subject, html);
    console.log("Welcome email sent successfully", response);
  } catch (error: unknown) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string,
): Promise<void> => {
  const subject = "Reset your password";
  const html = PASSWORD_RESET_REQUEST_TEMPLATE(resetUrl);

  try {
    const response = await sendEmail(email, subject, html);
    console.log(
      "Reset your password mail has been sent to your mail",
      response,
    );
  } catch (error: unknown) {
    console.log("Error sending reset password email", error);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (
  email: string,
  firstname: string,
): Promise<void> => {
  const subject = "Welcome to Flextable";
  // ensure correct replacement
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{firstname}", firstname);

  try {
    // Explicitly passing the `html` field in the email
    const response = await sendEmail(email, subject, html);
    console.log("Welcome email sent successfully", response);
  } catch (error: unknown) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendOrderConfirmationEmail = async (
  email: string,
  firstname: string,
  reservationID: string,
  amount: number,
  spaceName: string,
  date: string,
): Promise<void> => {
  const subject = "Order Confirmation";
  // ensure correct replacement
  const html = ORDER_CONFIRMATION_TEMPLATE(firstname, reservationID, amount, spaceName, date);

  try {
    // Explicitly passing the `html` field in the email
    const response = await sendEmail(email, subject, html);
    console.log("Order confirmation email sent successfully", response);
  } catch (error: unknown) {
    console.error("Error sending order confirmation email:", error);
    throw new Error(`Error sending order confirmation email: ${error}`);
  }
};
