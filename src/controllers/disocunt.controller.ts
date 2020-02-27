import Discount, { IDiscount } from '../models/discount.model';
import sendResponse from '../helpers/response';
import httpStatus from 'http-status';

//Get All Discounts
export const GetAllDiscounts = () => Discount.find();

//Get One Discount
export const GetSingleDiscount = async (discountID: String) => {
  try {
    const discount = await Discount.findById(discountID);

    if (!discount) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'discount does not exist',
        {},
        null,
        '',
      );
    }

    return sendResponse(httpStatus.OK, 'Discount Here', discount, null, '');
  } catch (error) {
    throw new Error(error);
  }
};

//Create a Discount
export const Create = async (body: IDiscount) => {
  try {
    const { name } = body;

    const Exist = await Discount.findOne({ name });

    if (Exist) {
      return sendResponse(
        httpStatus.OK,
        'Discount with this name already exists',
        {},
        null,
        '',
      );
    }

    const discount = new Discount(body);
    const payload = await discount.save();

    return sendResponse(
      httpStatus.OK,
      'Discount created successfully',
      payload,
      null,
      '',
    );
  } catch (error) {
    throw new Error(error);
  }
};

//Update a Discount
export const Update = async (body: IDiscount, discountID: String) => {
  try {
    const discount = await Discount.findById(discountID);

    if (!discount) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'Discount not found',
        {},
        null,
        '',
      );
    }

    await Discount.findOneAndUpdate(
      { _id: body._id },
      { $set: body },
      { new: true },
      (err, result) => {
        if (err) {
          return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Internal Server Error',
            {},
            null,
            '',
          );
        }
        return sendResponse(
          httpStatus.OK,
          'Discount created',
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

//Delete a Discount
export const Delete = async (body: IDiscount, discountID: String) => {
  try {
    const discount = await Discount.findById(discountID);

    if (!discount) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'Discount not found',
        {},
        null,
        '',
      );
    }

    await Discount.findByIdAndUpdate(
      { _id: body._id },
      { $set: { isDeleted: true } },
      { new: true },
      (err, result) => {
        if (err) {
          return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Internal Server Error',
            {},
            null,
            '',
          );
        }
        return sendResponse(
          httpStatus.OK,
          'Discount updated',
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
