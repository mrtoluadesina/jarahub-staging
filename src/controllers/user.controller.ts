import User, { IUser, ILogin, IUserNoExtend } from '../models/user.model';
import Address from '../models/address.model';
import Wishlist from '../models/wishlist.model';
import httpStatus from 'http-status';
import decrypt from 'bcryptjs';
import sendResponse from '../helpers/response';
import generateMessageTemplate from '../helpers/generateMessageTemplateHeader';
import { tokenEncoder as TokenEncoder } from '../helpers/tokenEncoder';
import sendMail from '../helpers/sendMail';
import messages from '../helpers/mailMessage';
import sendMailV2 from '../helpers/sendMailV2';
import joi from '@hapi/joi';

export interface ISocialLogin {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

// Return All Users
export const getAllUsers = () => User.find();

// Creating a User
export const Signup = async (body: IUserNoExtend) => {
  try {
    const { email } = body;

    const Exist = await User.findOne({ email });
    let user: IUser | null;
    if (Exist && !Exist.isGuest) {
      return sendResponse(httpStatus.OK, 'This email is in use', {}, null, '');
    }
    if (!Exist) {
      user = new User(body);
    } else {
      let password = body.password;
      delete body.password;
      user = await User.findOneAndUpdate(
        { email },
        { ...body, isGuest: false },
        { new: true },
      );
      user!!.password = password;
    }
    const msg = generateMessageTemplate(
      process.env.SENDER_MAIL,
      email,
      {
        email: email,
        name: user!.firstName,
        Receiver_Name: `${user!.firstName} ${user!.lastName}`,
      },
      process.env.WELCOME_MAIL_TEMPLATE_ID,
    );
    await sendMailV2(msg);
    const data = await user!!.save();
    const subject = 'Welcome to EmallFZE! 👋 Please confirm your email address';
    const token = TokenEncoder(email, data._id, data.isActive!);

    await sendMail(email, messages.confirmationEmail(token), subject);

    return sendResponse(
      httpStatus.OK,
      'Signup Successful',
      data.transform(),
      null,
      token,
    );
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

//Socail Login
export const SocialLogin = async (body: ISocialLogin) => {
  try {
    const user: any = await User.findOne({ email: body.email });
    if (!user) {
      const newUser = new User(body);
      await newUser.save();

      return sendResponse(
        httpStatus.OK,
        'Login Successful',
        newUser,
        null,
        TokenEncoder(newUser.email, newUser._id, body.isActive),
      );
    }

    return sendResponse(
      httpStatus.OK,
      'Login Successful',
      user,
      null,
      TokenEncoder(user.email, user._id, user.isActive),
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
    const userByEmail = await User.findOne({ email: userID });

    if (!userByEmail) {
      throw new Error(error);
    }
    return sendResponse(httpStatus.OK, 'user found', userByEmail, null, '');
  }
};

export const getMe = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(httpStatus.NOT_FOUND, 'user not found', {}, null, '');
    }

    const userAddresses = await Address.find({ userId });
    const userWishlist = await Wishlist.find({ userId }).populate({
      path: 'productId',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    });

    let me = {
      details: user,
      addresses: userAddresses,
      wishlist: userWishlist,
    };

    return sendResponse(httpStatus.OK, 'user found', me, null, '');
  } catch (error) {
    throw new Error(error);
  }
};

//Submit Contact Form

const contactFormSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi
    .string()
    .email()
    .required(),
  how: joi.string().required(),
  message: joi.string().required(),
});

export const submitContact = async (data: {
  name: string;
  email: string;
  how: string;
  message: string;
}) => {
  try {
    const { value, error } = contactFormSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { email, how, message, name } = value as {
      name: string;
      email: string;
      how: string;
      message: string;
    };

    const msg = generateMessageTemplate(
      process.env.SENDER_MAIL,
      process.env.CONTACT_FORM_MAIL,
      {
        email,
        name,
        enquiry: how,
        message,
      },
      process.env.CONTACT_FORM_TEMPLATE_ID,
    );
    const reply = generateMessageTemplate(
      process.env.SENDER_MAIL,
      email,
      {
        name,
        enquiry: how,
      },
      process.env.CONTACT_AUTO_REPLY_MAIL_TEMPLATE,
    );
    await sendMailV2(msg);
    await sendMailV2(reply);
    return sendResponse(httpStatus.OK, 'Enquiry submitted', {}, null, '');
  } catch (error) {
    throw new Error(error);
  }
};
