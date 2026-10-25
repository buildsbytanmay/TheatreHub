import nodemailer from "nodemailer";

export const sendEmail = (email, subject, text) => {
  const mailUser = process.env.MAIL_USERNAME || process.env.NODEMAILER_EMAIL;
  const mailPass = process.env.MAIL_PASSWORD || process.env.NODEMAILER_PASSWORD;

  if (!mailUser || !mailPass) {
    console.log("ℹ️ Nodemailer credentials not provided. Skipping email dispatch.");
    return;
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  let mailOptions = {
    from: mailUser,
    to: email,
    subject: subject,
    text: text,
    html: "<b>Hello Dear User, we are happy that you joined our family. Kind Regards, TheatreHub Team.</b>",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error sending email: " + err.message);
    } else {
      console.log("Email sent successfully to " + email);
    }
  });
};
