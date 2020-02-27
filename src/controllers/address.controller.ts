import httpStatus from 'http-status';
import Address, { IAddress } from '../models/address.model';
import ControllerResponse from '../interfaces/ControllerResponse';

import sendResponse from '../helpers/response';

/**
 * Controller to post an address
 *
 * @param {IAddress} address - The address details
 * @param {String} _customerId - The customer ID
 * @returns {ControllerResponse}
 */

export async function createAddress(
  address: IAddress,
  _customerId: string,
): Promise<ControllerResponse> {
  try {
    /**Posibly first check if user has other address
     * Maybe limit the amout off address to 3 per customer
     * const hasAddress = await Address.find({userId: customerId});
     * if(hasAddress.length > 2) return {statusCode: 401, message: 'Delete and address or Update One'}
     * **/

    const newAddress: IAddress = new Address(address);
    const response = await newAddress.save();

    return sendResponse(200, 'Address Created', response, null, '');
  } catch (error) {
    return {
      statusCode: httpStatus.OK,
      message: 'Internal Server Error',
      error: error.message,
    };
  }
}

/**
 * Controller to get a single user address
 *
 * @param {String} userId - The user ID
 * @returns {ControllerResponse}
 */

export async function getUserAddress(
  userId: string,
): Promise<ControllerResponse> {
  try {
    const userAddress: IAddress[] = await Address.find({ userId });

    if (!userAddress.length)
      return sendResponse(
        404,
        'No address for this user',
        userAddress,
        null,
        '',
      );

    return sendResponse(200, 'Address(es) found', userAddress, null, '');
  } catch (error) {
    return sendResponse(
      500,
      'Internal Server Error',
      { error: error.message },
      null,
      '',
    );
  }
}

/**
 * Controller to get all addresses
 *
 * @returns {ControllerResponse}
 */

export async function getAllAddress(): Promise<ControllerResponse> {
  try {
    const address: IAddress[] = await Address.find();

    return sendResponse(httpStatus.OK, 'Success', address, null, '');
  } catch (error) {
    return sendResponse(
      500,
      'Internal Server Error',
      { error: error.message },
      null,
      '',
    );
  }
}
