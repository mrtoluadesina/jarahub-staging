import Coupon, { ICouponNoExtend } from '../models/coupon.model';
import sendResponse from '../helpers/response';
import httpStatus from 'http-status';

//Get coupon by code
export const getCoupon = async (code: String) => {
  try {
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

export const createCoupon = async (body: ICouponNoExtend) => {
  try {
    // @ts-ignore
    const { user, id } = body;
    delete body.user;
    delete body.id;
    body.createdBy = id;
    const couponExist = await Coupon.findOne({ code: body.code });
    if (couponExist) {
      return sendResponse(
        httpStatus.BAD_REQUEST,
        'Coupon Code already exist',
        {},
        null,
        '',
      );
    }
    const coupon = new Coupon(body);
    await coupon.save();
    return sendResponse(
      httpStatus.CREATED,
      'Coupon created successfully',
      coupon,
      null,
      '',
    );
  } catch (error) {
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      {},
      null,
      '',
    );
  }
};

export const getAll = async () => {
  const coupons = await Coupon.find({});
  return sendResponse(
    httpStatus.CREATED,
    'Coupon created successfully',
    coupons,
    null,
    '',
  );
};
