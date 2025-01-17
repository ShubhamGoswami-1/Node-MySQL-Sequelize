import nodemailer from 'nodemailer';

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: 'investincedo@gmail.com inVest Inc',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email info: ", info);
    return info;
  } catch (error) {
      console.log("Error sending mail", error);
  }
};

export default mailSender;
