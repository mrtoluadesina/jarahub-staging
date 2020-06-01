import Admin, { IAdmin } from '../models/admin.model';
import { compare } from 'bcryptjs';
import { adminTokenEncoder as TokenEncoder } from '../helpers/tokenEncoder';
import StatusResponse from '../interfaces/ControllerResponse';

/**
 *
 * @param {IAdmin} adminBody - The admin details
 * @returns {StatusResponse}
 */

export async function createAdmin(adminBody: IAdmin): Promise<StatusResponse> {
  try {
    let exist = await Admin.findOne({ email: adminBody.email });

    if (exist) {
      return { statusCode: 401, message: 'Email already in use' };
    }

    if (adminBody.isSuper) {
      let superExist = await Admin.findOne({ isSuper: true });

      if (superExist)
        return {
          statusCode: 401,
          message: 'Can not register another super admin',
        };
    }

    const admin = new Admin(adminBody);

    const payload = await admin.save();

    return {
      statusCode: 201,
      message: 'Account created Successfully',
      payload,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}

/**
 *
 * @param userId - The admin user id
 * @returns {StatusResponse}
 *
 */

export async function getSingleAdmin(userId: string): Promise<StatusResponse> {
  try {
    const payload = await Admin.findById(userId);

    if (!payload) return { statusCode: 404, message: 'Admin not found' };

    return { statusCode: 200, message: 'Admin found', payload };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}

/**
 * @returns {Promise<StatusResponse>}
 */

export async function getAllAdmin(): Promise<StatusResponse> {
  try {
    const payload = await Admin.find();

    if (!payload.length) return { statusCode: 404, message: 'No users found' };

    return { statusCode: 200, message: 'Admin found', payload };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}

/**
 *
 * @param adminId - The admin Id
 * @param data - The admin detail updates
 * @returns {Promise<StatusResponse>}
 */

export async function updateAdmin(
  adminId: string,
  data: {},
): Promise<StatusResponse> {
  try {
    const exist = await Admin.findById(adminId);

    if (!exist) return { statusCode: 404, message: 'Admin not found' };

    const payload = await Admin.findByIdAndUpdate({ _id: adminId }, data, {
      new: true,
    });

    return { statusCode: 200, message: 'Admin details updated', payload };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}
export async function deleteAdmin(adminId: string): Promise<StatusResponse> {
  try {
    const exist = await Admin.findById(adminId);

    if (!exist) return { statusCode: 404, message: 'Admin not found' };

    const payload = await Admin.findByIdAndUpdate(
      { _id: adminId },
      { $set: { isDeleted: true } },
      {
        new: true,
      },
    );

    return { statusCode: 200, message: 'Admin Deleted', payload };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
      error,
    };
  }
}

/**
 *
 * @param adminId - The admin ID
 * @returns {Promise<StatusResponse>}
 */

export async function blockAdmin(adminId: string): Promise<StatusResponse> {
  try {
    const admin = await Admin.findById(adminId);

    if (!admin) return { statusCode: 404, message: 'Admin not found' };

    admin.isBlocked = true;
    await admin.save();

    return { statusCode: 200, message: `${admin.firstName} blocked` };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}

/**
 *
 * @param {String} adminId - The admin id
 * @returns {Promise<StatusResponse>}
 */

export async function unblockAdmin(adminId: string): Promise<StatusResponse> {
  try {
    const admin = await Admin.findById(adminId);

    if (!admin) return { statusCode: 404, message: 'Admin not found' };

    if (!admin.isBlocked)
      return { statusCode: 401, message: 'Admin was never blocked' };

    admin.isBlocked = false;
    await admin.save();

    return { statusCode: 200, message: `${admin.firstName} unblocked` };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}

/**
 *
 * @param {String} email - The admin email address
 * @param {String} password - The admin password
 * @returns {Promise<StatusResponse>}
 */

export async function loginAdmin(
  email: string,
  password: string,
): Promise<StatusResponse> {
  try {
    const admin = await Admin.findOne({ email });

    if (!admin)
      return { statusCode: 401, message: 'Email or Password Incorrect' };

    const isValid = await compare(password, admin.password);

    if (!isValid)
      return { statusCode: 401, message: 'Email or Password Incorrect' };

    if (!admin.isVerfied)
      return { statusCode: 401, message: 'Account not verified' };

    const { email: newEmail, _id, isSuper } = admin;

    return {
      statusCode: 200,
      message: 'Login Successful',
      payload: admin,
      token: TokenEncoder(newEmail, _id, isSuper!),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
