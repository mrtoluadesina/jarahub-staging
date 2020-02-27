import ForgotPassword, { IForgot } from '../models/forgotPassword.model';
import ResetPassword from '../models/resetPassword.model';
import User from '../models/user.model';
import httpStatus from 'http-status';
import { tokenEncoder as TokenEncoder } from '../helpers/tokenEncoder';
import sendResponse from '../helpers/response';
import sendMail from '../helpers/sendMail';
import messages from '../helpers/mailMessage';
import Response from '../interfaces/ControllerResponse';

export async function createForgotPassword(body: IForgot) {
  try {
    const user: any = await User.findOne({ email: body.email });
    if (!user) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'reset link has been sent to this email address',
        {},
        null,
        '',
      );
    }
    await ForgotPassword.deleteMany({ email: body.email });
    const subject = `Hi! 👋 You can reset your password now`;
    const token = TokenEncoder(body.email, user._id, user.isActive);
    const passwordReset = new ForgotPassword({
      email: user.email,
      token,
    });
    await passwordReset.save();
    sendMail(passwordReset.email, messages.forgotPassword(token), subject);
    return sendResponse(
      httpStatus.OK,
      'A link to reset your password has been sent to your email.',
      {},
      null,
      token,
    );
  } catch (error) {
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      'an error occured',
      {},
      null,
      '',
    );
  }
}

export async function resetPassword(
  password: string,
  id: string,
): Promise<Response> {
  try {
    const user = await User.findById(id);
    if (!user)
      return sendResponse(
        httpStatus.NOT_FOUND,
        'Link is invalid or may have expired',
        {},
        null,
        '',
      );

    user.password = password;

    const subject = `Hi! 👋 Your rest password request was successful`;

    let savePassword = user.save();
    let resetPassword = new ResetPassword({ userID: user._id });
    let saveHistory = resetPassword.save();
    let sendEmailNotification = sendMail(
      user.email,
      messages.resetPassword(user.email),
      subject,
    );

    const [passwordResult] = await Promise.all([
      savePassword,
      sendEmailNotification,
      saveHistory,
    ]);

    return sendResponse(
      httpStatus.OK,
      'Password reset successful. Kindly login',
      passwordResult,
      null,
      '',
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
