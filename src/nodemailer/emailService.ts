import { MailOptions } from "@/types";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
// import { MailOptions } from "nodemailer/lib/smtp-transport";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
    },
});



const sendEmail = async (to: string, subject: string, html?: string) => {
    const mailOptions: MailOptions = {
        from: `"Flextable.co" <${process.env.ZOHO_EMAIL}>`,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;
