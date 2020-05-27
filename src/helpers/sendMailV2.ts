import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export default async function sendMailV2(msg: MailDataRequired) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send({
    ...msg,
    mailSettings: {
      sandboxMode: { enable: process.env.NODE_ENV === 'test' ? true : false },
    },
  });
}
