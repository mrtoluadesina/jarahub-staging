import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export default function formatMessageHeaders(
  from: string,
  to: string,
  templateData: Record<string, unknown>,
  templateId: string,
  subject: string,
): MailDataRequired {
  return {
    text: subject,
    from,
    personalizations: [
      {
        to: [{ email: to }],
        dynamicTemplateData: templateData,
      },
    ],
    templateId,
  };
}
