export const VERIFICATION_EMAIL_TEMPLATE = (verificationToken: string) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify</title>
  </head>

  <body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #ffffff;">
    <div style="max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px 12px 24px;">
      <div style="width: 85%; margin: 0 auto;">
        <div style="width: 160px; margin-bottom: 20px;">
          <img
            src="https://res.cloudinary.com/kodenigga/image/upload/v1737800021/flextable/flextable-full-logo_hzpgtc.svg"
            alt="logo"
            style="width: 100%; height: 100%; object-fit: contain"
          />
        </div>
        <div style="background: #f15a241c; width: fit-content; color: #f15a24; font-weight: 600; padding: 10px 24px; border-radius: 24px; font-size: 14px; margin: 60px 0 20px;">
          Verify your email
        </div>
        <h1 style="font-size: 24px; color: #1e1e1e;">OTP Verification</h1>
        <p style="font-size: 16px; line-height: 28px; color: #1e1e1ee3; margin-top: 32px;">
          Thank you for choosing Flextable to support your workspace needs! Your booking has been confirmed, and we&apos;re excited to provide you.
        </p>
        <div style="margin-top: 24px; text-align: center;">
          <h1 style="letter-spacing: 12px; color: #000;">${verificationToken}</h1>
        </div>
        <p style="font-size: 16px; line-height: 28px; color: #1e1e1ee3; margin-top: 32px;">
          Thank you for choosing Flextable to support your workspace needs! Your booking has been confirmed, and we&apos;re excited to provide you.
        </p>
      </div>
      <div style="background: #f15a241c; border-radius: 20px; padding: 60px 10px; margin-top: 60px; text-align: center;">
        <h1 style="font-size: 24px; color: #1e1e1e;">Become a FlexEnabler</h1>
        <p style="font-size: 14px; line-height: 24px; margin: 20px 0 32px;">
          Thank you for choosing Flextable to support your workspace needs! <br />
          Your booking has been confirmed, and we&apos;re excited to provide you with.
        </p>
        <a href="https://chat.whatsapp.com/IqeOJpJmcEoA1ZPVAIkzI8" style="background: #f15a24; color: white; padding: 14px 24px; font-size: 14px; border-radius: 24px; text-decoration: none;">Join the Community</a>
      </div>
      <div style="font-size: 12px; text-align: center; color: #1e1e1ee3; margin-top: 36px; margin-bottom: 40px;">
        <p>For any feedback or inquiries, get in touch with us at</p>
        <a href="mailto:support@flextable.co" style="color: #0a26ff;">support@flextable.co</a>
        <p>Copyright &copy; Flextable. 2025 All rights reserved.</p>
        <p>44 Okumagba Ave, opp. FCMB, Estate, Warri 332213, Delta, Nigeria.</p>
        <div style="margin-top: 18px;">
          <a
            href="#"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800272/flextable/facebook_jury4e.svg" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/company/flextables/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/linkedin_pl64sh.svg" alt="" />
          </a>
          <a
            href="https://x.com/useflextable"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800274/flextable/x_u03obq.svg" alt="" />
          </a>
          <a
            href="https://www.instagram.com/useflextable/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/instagram_ch2jjo.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = (firstname: string, lastname: string) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
      rel="stylesheet"
    />
  </head>

  <body style="overflow-x: hidden; font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #ffffff; box-sizing: border-box;">
    <div style="max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px 12px 24px;">
      <div style="width: 85%; margin: 0 auto;">
        <div style="width: 160px;">
          <img
            src="https://res.cloudinary.com/kodenigga/image/upload/v1737800021/flextable/flextable-full-logo_hzpgtc.svg"
            alt="logo"
            style="width: 100%; height: 100%; object-fit: contain"
          />
        </div>

        <div
          style="background: rgba(147, 39, 219, 0.11); width: fit-content; color: #9327db; font-weight: 600; padding: 10px 24px; border-radius: 24px; font-size: 14px; margin-top: 60px; margin-bottom: 20px;"
        >
          Welcome to the Flex
        </div>
        <h1>Hi, ${firstname} ${lastname}</h1>
        <div
          style="font-size: 16px; line-height: 28px; color: #1e1e1ee3; width: 95%; margin-top: 32px;"
        >
          <p>
            Thank you for choosing Flextable to support your workspace needs! Your
            booking has been confirmed, and we&apos;re excited to provide you
            with a productive and comfortable environment to work, meet, or
            focus.
          </p>
        </div>
      </div>

      <div
        style="background: rgba(147, 39, 219, 0.11); border-radius: 20px; padding: 60px 10px; margin-top: 60px;"
      >
        <h1 style="text-align: center;">Become a FlexEnabler</h1>
        <div>
          <p
            style="text-align: center; font-size: 14px; line-height: 24px; margin: 20px 0px 32px;"
          >
            Thank you for choosing Flextable to support your workspace needs! <br />
            Your booking has been confirmed, and we&apos;re excited to provide
            you with.
          </p>
          <a
            href="https://chat.whatsapp.com/IqeOJpJmcEoA1ZPVAIkzI8"
            style="display: block; width: fit-content; text-decoration: none; background: #9327db; color: white; padding: 14px 24px; font-size: 14px; border-radius: 24px; margin: 0px auto;"
          >
            Join the Community
          </a>
        </div>
      </div>

      <div
        style="font-size: 12px; text-align: center; color: #1e1e1ee3; margin-top: 36px; margin-bottom: 40px;"
      >
        <p>For any feedback or inquiries, get in touch with us at</p>
        <a
          href="mailto:support@flextable.co"
          style="display: block; width: fit-content; text-decoration: none; color: #0A26FF; margin: 0px auto 0px;"
        >
          support@flextable.co
        </a>
        <p>Copyright &copy; Flextable. 2025 All rights reserved.</p>
        <p>44 Okumagba Ave, opp. FCMB, Estate, Warri 332213, Delta, Nigeria.</p>

        <div>
          <a
            href="#"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800272/flextable/facebook_jury4e.svg" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/company/flextables/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/linkedin_pl64sh.svg" alt="" />
          </a>
          <a
            href="https://x.com/useflextable"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800274/flextable/x_u03obq.svg" alt="" />
          </a>
          <a
            href="https://www.instagram.com/useflextable/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/instagram_ch2jjo.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = (resetUrl: string) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password</title>
  </head>

  <body style="overflow-x: hidden; font-family: 'Inter', sans-serif; background-color: #ffffff; margin: 0; padding: 0; box-sizing: border-box;">
    <div style="max-width: 800px; margin: 0 auto; background: rgb(255, 255, 255); padding: 40px 12px 24px; box-sizing: border-box;">
      <div style="width: 85%; margin: 0 auto; box-sizing: border-box;">
        <div style="width: 160px; box-sizing: border-box;">
          <img
            src="https://res.cloudinary.com/kodenigga/image/upload/v1737800021/flextable/flextable-full-logo_hzpgtc.svg"
            alt="logo"
            style="width: 100%; height: 100%; object-fit: contain"
          />
        </div>

        <div style="background: #0a26ff1c; width: fit-content; color: #0a26ff; font-weight: 600; padding: 10px 24px; border-radius: 24px; font-size: 14px; margin-top: 60px; margin-bottom: 20px; box-sizing: border-box;">Forgot Password</div>
        <h1 style="max-width: 600px; width: 100%; box-sizing: border-box;">Reset your Password with the Link Below</h1>
        <div style="font-size: 16px; line-height: 28px; color: #1e1e1ee3; width: 95%; margin-top: 32px; box-sizing: border-box;">
          <p>
            Thank you for choosing Flextable to support your workspace needs! Your booking has been confirmed, and we&apos;re excited to provide you.
          </p>
        </div>
        <a href=${resetUrl} style="background: #000; color: white; padding: 14px 24px; font-size: 14px; border-radius: 24px; margin-top: 36px; display: block; width: fit-content; text-decoration: none; box-sizing: border-box;">Reset Password</a>
        <p>or use the link below</p>
        <div style="font-size: 16px; line-height: 28px; color: #1e1e1ee3; width: 95%; margin-top: 32px; box-sizing: border-box;">
          <p>
            ${resetUrl}
          </p>
        </div>
      </div>

      <div style="background: #0a26ff1c; border-radius: 20px; padding: 60px 10px; margin-top: 60px; box-sizing: border-box;">
        <h1 style="text-align: center; box-sizing: border-box;">Become a FlexEnabler</h1>
        <div style="box-sizing: border-box;">
          <p style="text-align: center; font-size: 14px; line-height: 24px; margin: 20px 0px 32px; box-sizing: border-box;">
            Thank you for choosing Flextable to support your workspace needs! <br />Your booking has been confirmed, and we&apos;re excited to provide you with.
          </p>
          <a href="https://chat.whatsapp.com/IqeOJpJmcEoA1ZPVAIkzI8" style="background: #0a26ff; color: white; padding: 14px 24px; font-size: 14px; border-radius: 24px; margin: 0 auto; display: block; width: fit-content; text-decoration: none; box-sizing: border-box;">Join the Community</a>
        </div>
      </div>

      <div style="font-size: 12px; text-align: center; color: #1e1e1ee3; margin-top: 36px; margin-bottom: 40px; box-sizing: border-box;">
        <p style="margin: 20px 0px 10px; box-sizing: border-box;">For any feedback or inquiries, get in touch with us at</p>
        <a href="mailto:support@flextable.co" style="color: #0A26FF; display: block; width: fit-content; margin: 0 auto; text-decoration: none; box-sizing: border-box;">support@flextable.co</a>
        <p style="margin: 20px 0px 10px; box-sizing: border-box;">Copyright &copy; Flextable. 2025 All rights reserved.</p>
        <p style="margin: 20px 0px 10px; box-sizing: border-box;">44 Okumagba Ave, opp. FCMB, Estate, Warri 332213, Delta, Nigeria.</p>

        <div style="margin-top: 18px;">
          <a
            href="#"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800272/flextable/facebook_jury4e.svg" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/company/flextables/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/linkedin_pl64sh.svg" alt="" />
          </a>
          <a
            href="https://x.com/useflextable"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800274/flextable/x_u03obq.svg" alt="" />
          </a>
          <a
            href="https://www.instagram.com/useflextable/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/instagram_ch2jjo.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Flextable</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ORDER_CONFIRMATION_TEMPLATE = (firstname: string, spaceName: string, amount: number, date: string, reservationID: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmed</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
      rel="stylesheet"
    />
  </head>

  <body
    style="
      overflow-x: hidden;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      box-sizing: border-box;
    "
  >
    <div
      style="
        max-width: 800px;
        margin: 0 auto;
        background: #ffffff;
        padding: 40px 12px 24px;
      "
    >
      <div style="width: 85%; margin: 0 auto">
        <div style="width: 160px">
          <img
            src="https://res.cloudinary.com/kodenigga/image/upload/v1737800021/flextable/flextable-full-logo_hzpgtc.svg"
            alt="logo"
            style="width: 100%; height: 100%; object-fit: contain"
          />
        </div>

        <div
          style="
            background: #47d40011;
            width: fit-content;
            color: #47d400;
            font-weight: 600;
            padding: 14px 24px;
            border-radius: 24px;
            font-size: 14px;
            margin-top: 60px;
            margin-bottom: 20px;
          "
        >
          Order Confirmation
        </div>
        <h1>Your Order Was Successful</h1>
        <div
          style="
            font-size: 16px;
            line-height: 28px;
            color: #1e1e1ee3;
            width: 95%;
            margin-top: 32px;
          "
        >
          <p>
            Hi ${firstname}, your booking for ${spaceName} has been confirmed. We
            are excited 😃 having you book a space through Flextable. We will
            communicate back to you further details.
          </p>

          <p>
            <strong>Booking Details:</strong>
            <ul>
              <li>Space: ${spaceName}</li>
              <li>Amount: ${amount}</li>
              <li>Date: ${date}</li>
              <li>Reservation ID: ${reservationID}</li>
            </ul>
          </p>
          <p>
            View your <a target="_blank" style="color: #9327db; text-decoration: underline;" href="https://flextable/dashboard/my-reservations"><strong>reservations</strong></a> in your profile.
          </p>
        </div>
      </div>

      <div
        style="
          background: rgba(147, 39, 219, 0.11);
          border-radius: 20px;
          padding: 60px 10px;
          margin-top: 60px;
        "
      >
        <h1 style="text-align: center">Become a FlexEnabler</h1>
        <div>
          <p
            style="
              text-align: center;
              font-size: 14px;
              line-height: 24px;
              margin: 20px 0px 32px;
            "
          >
            Thank you for choosing Flextable to support your workspace needs!
            <br />
            Your booking has been confirmed, and we&apos;re excited to provide
            you with.
          </p>
          <a
            href="https://chat.whatsapp.com/IqeOJpJmcEoA1ZPVAIkzI8"
            style="
              display: block;
              width: fit-content;
              text-decoration: none;
              background: #9327db;
              color: white;
              padding: 14px 24px;
              font-size: 14px;
              border-radius: 24px;
              margin: 0px auto;
            "
          >
            Join the Community
          </a>
        </div>
      </div>

      <div
        style="
          font-size: 12px;
          text-align: center;
          color: #1e1e1ee3;
          margin-top: 36px;
          margin-bottom: 40px;
        "
      >
        <p>For any feedback or inquiries, get in touch with us at</p>
        <a
          href="mailto:support@flextable.co"
          style="
            display: block;
            width: fit-content;
            text-decoration: none;
            color: #0a26ff;
            margin: 0px auto 0px;
          "
        >
          support@flextable.co
        </a>
        <p>Copyright &copy; Flextable. 2025 All rights reserved.</p>
        <p>44 Okumagba Ave, opp. FCMB, Estate, Warri 332213, Delta, Nigeria.</p>

        <div>
          <a
            href="#"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img
              src="https://res.cloudinary.com/kodenigga/image/upload/v1737800272/flextable/facebook_jury4e.svg"
              alt=""
            />
          </a>
          <a
            href="https://www.linkedin.com/company/flextables/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img
              src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/linkedin_pl64sh.svg"
              alt=""
            />
          </a>
          <a
            href="https://x.com/useflextable"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img
              src="https://res.cloudinary.com/kodenigga/image/upload/v1737800274/flextable/x_u03obq.svg"
              alt=""
            />
          </a>
          <a
            href="https://www.instagram.com/useflextable/"
            style="
              overflow: hidden;
              display: inline-block;
              margin: 18px 10px;
              padding: 5px;
              height: 28px;
              width: 28px;
            "
          >
            <img
              src="https://res.cloudinary.com/kodenigga/image/upload/v1737800273/flextable/instagram_ch2jjo.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </body>
</html>

`;