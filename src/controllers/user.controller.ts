import User, { IUser, ILogin, IUserNoExtend } from '../models/user.model';
import httpStatus from 'http-status';
import decrypt from 'bcryptjs';
import sendResponse from '../helpers/response';
import { tokenEncoder as TokenEncoder } from '../helpers/tokenEncoder';
import sendMail from '../helpers/sendMail';
import messages from '../helpers/mailMessage';

// Return All Users
export const getAllUsers = () => User.find();

// Creating a User
export const Signup = async (body: IUserNoExtend) => {
  try {
    const { email } = body;

    const Exist = await User.findOne({ email });

    if (Exist) {
      return sendResponse(httpStatus.OK, 'This email is in use', {}, null, '');
    }

    const user = new User(body);
    const data = await user.save();
    const subject = 'Welcome to EmallFZE! 👋 Please confirm your email address';
    const token = TokenEncoder(email, data._id, data.isActive!);

    await sendMail(email, messages.confirmationEmail(token), subject);

    return sendResponse(httpStatus.OK, 'Signup Successful', data, null, token);
  } catch (error) {
    throw new Error(error);
  }
};

//Login a User
export const Login = async (body: ILogin) => {
  try {
    const user: any = await User.findOne({ email: body.email });
    if (!user) {
      return sendResponse(httpStatus.NOT_FOUND, 'User not found', {}, null, '');
    }

    const isValid = await decrypt.compare(body.password, user.password);

    const { email, _id, isActive } = user;

    if (!isValid || !isActive) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'email or password is incorrect',
        {},
        null,
        '',
      );
    }

    return sendResponse(
      httpStatus.OK,
      'login successful',
      user,
      null,
      TokenEncoder(email, _id, isActive),
    );
  } catch (error) {
    throw new Error(error);
  }
};

//Update a User
export const Update = async (body: IUser, userID: String) => {
  try {
    const user = await User.findById(userID);

    if (!user) {
      return sendResponse(httpStatus.NOT_FOUND, 'User not found', {}, null, '');
    }

    await User.findOneAndUpdate(
      { _id: body._id },
      { $set: body },
      { new: true },
      (err, result) => {
        if (err) {
          return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'An Error Occured',
            {},
            null,
            '',
          );
        }
        return sendResponse(
          httpStatus.OK,
          'account updated',
          result!,
          null,
          '',
        );
      },
    );

    return;
  } catch (error) {
    throw new Error(error);
  }
};

//Delete a User
export const Delete = async (body: IUser, userID: String) => {
  try {
    const user = await User.findById(userID);

    if (!user) {
      return sendResponse(httpStatus.NOT_FOUND, 'user not found', {}, null, '');
    }

    await User.findOneAndUpdate(
      { _id: body._id },
      { $set: { isDeleted: true, isActive: false } },
      { new: true },
      (err, result) => {
        if (err) {
          return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'an error occured',
            result!,
            null,
            '',
          );
        }
        return sendResponse(
          httpStatus.OK,
          'account deleted',
          result!,
          null,
          '',
        );
      },
    );

    return;
  } catch (error) {
    throw new Error(error);
  }
};

//Get one User
export const getOneUser = async (userID: string) => {
  try {
    const user = await User.findById(userID);

    if (!user) {
      return sendResponse(httpStatus.NOT_FOUND, 'user not found', {}, null, '');
    }

    return sendResponse(httpStatus.OK, 'user found', user, null, '');
  } catch (error) {
    throw new Error(error);
  }
};

//Change Password

//
