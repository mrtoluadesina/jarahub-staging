import nodemailer from 'nodemailer';

const sendMail = (email: string, message: string, subject: string) => {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let mailOptions = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject,
    html: message,
  };
  smtpTransport.sendMail(mailOptions, (err: any) => {
    if (err) return new Error(err);
    return;
  });
};

export default sendMail;
