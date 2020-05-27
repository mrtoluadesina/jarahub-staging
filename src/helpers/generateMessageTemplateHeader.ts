// import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export default function formatMessageHeaders(
  from: string,
  to: string,
  templateData: Record<string, unknown>,
  templateId: string,
): any {
  return {
    from,
    personalizations: [
      {
        to: [{ email: to }],
        dynamic_template_data: templateData,
      },
    ],
    templateId,
  };
}
