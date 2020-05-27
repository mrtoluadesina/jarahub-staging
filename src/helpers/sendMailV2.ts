import sgMail from '@sendgrid/mail';
// import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function sendMailV2(msg: any) {
  try {
    await sgMail.send({
      ...msg,
      mailSettings: {
        sandboxMode: { enable: process.env.NODE_ENV === 'test' ? true : false },
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
