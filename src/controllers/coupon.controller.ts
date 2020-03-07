import Coupon, {  } from '../models/coupon.model';
import sendResponse from '../helpers/response';
import httpStatus from 'http-status';



//Get coupon by code
export const GetCoupon = async (code: String) => {
  try {
    console.log('sdfsdff')
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'coupon does not exist',
        {},
        null,
        '',
      );
    }

    return sendResponse(httpStatus.OK, 'Discount Here', coupon, null, '');
  } catch (error) {
    throw new Error(error);
  }
};
