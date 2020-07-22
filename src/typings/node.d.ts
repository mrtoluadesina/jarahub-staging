declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    JWT_TOKEN_SECRET: string;
    MONGO_URI: string;
    PORT: string;
    MAIL_USER: string;
    MAIL_PASS: string;
    FORGOT_PASS_EMAIL: string;
    CLIENT_SIDE_URL: string;
    ELASTICSEARCH_URI: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_URL: string;
    CLIENT_AUTH_TOKEN: string;
    ALGOLIA_APPLICATION_ID: string;
    ALGOLIA_API_KEY: string;
    SENDGRID_API_KEY: string;
    WELCOME_MAIL_TEMPLATE_ID: string;
    SENDER_MAIL: string;
    ORDER_TEMPLATE_ID: string;
    CONTACT_FORM_TEMPLATE_ID: string;
    CONTACT_FORM_MAIL: string;
    CONTACT_AUTO_REPLY_MAIL_TEMPLATE: string;
  }
}
