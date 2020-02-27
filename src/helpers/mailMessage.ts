const message = {
  confirmationEmail: (token: string) => {
    return `
      <p>Hi User,</p>

      <p>Welcome to EmallFZE, Please click link below to verify your email address</p>

      ${process.env.CLIENT_SIDE_URL}/auth/login?token=${token}

      <p>Welcome to the most affordable ecommerce website in Nigeria.</p>
    `;
  },
  forgotPassword: (token: string) => {
    return `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
  
  <p>Please click on the following link, or paste this into your browser to complete the process:</p>
  
  ${process.env.CLIENT_SIDE_URL}/auth/reset-password?token=${token}
  
  <p>If you did not request this, please ignore this email and your password will remain unchanged</p>`;
  },
  resetPassword: (email: string) => {
    return `Hello
      This is a confirmation that the password for your account ${email} has just been changed`;
  },
};

export default message;
