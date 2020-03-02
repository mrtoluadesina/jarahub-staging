import Category, { ICategory } from '../models/category.model';
import elasticsearch from '../elasticsearch/config';
import sendResponse from '../helpers/response';
import httpStatus = require('http-status');

/**
 * @typedef {Object} ControllerResponse
 * @param {Number} statusCode - The status returned for the request
 * @param {String} message - The response message
 * @param {Object} payload - The response payload
 * @param {String} error - The error message if any
 * @param {String} token
 */

/**
 * @returns {ICategory}
 */
//Get all Categories
export const GetAllCategories = async () =>
  await Category.find().populate({
    path: 'children',
    populate: {
      path: 'children',
      model: 'Category',
    },
  });

/**
 *
 * @param {ICategory} body - The category detail
 * @returns {ControllerResponse}
 *
 */

//Create a Category
export const Create = async (body: ICategory) => {
  try {
    const { name } = body;

    const Exist = await Category.findOne({ name });

    if (Exist) {
      return sendResponse(httpStatus.OK, 'this category exist', {}, null, '');
    }

    const category = await new Category(body);

    if (body.parents && body.parents.length) {
      body.parents.forEach(async cat => {
        let parentCategory = await Category.findById(cat);
        parentCategory!.children!.push(category._id);
        await parentCategory!.save();
      });
    }

    const forIndex = elasticsearch.index({
      index: body.name
        .split(' ')
        .join('')
        .toLowerCase(),
      type: 'category',
      id: category._id.toString(),
      body: { name: category.name, isDeleted: category.isDeleted },
    });

    const savePayload = await category.save();

    const [payload, indexing] = await Promise.all([savePayload, forIndex]);

    return sendResponse(
      httpStatus.OK,
      'Category updated',
      { payload, index: indexing },
      null,
      '',
    );
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {ICategory} body - The updated details
 * @param {String} categoryID
 * @returns {ControllerResponse}
 */

//Update a Category
export const Update = async (body: ICategory, categoryID: String) => {
  try {
    const category = await Category.findById(categoryID);

    if (!category) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'category not found',
        {},
        null,
        '',
      );
    }

    await Category.findOneAndUpdate(
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
          'category updated',
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

/**
 *
 * @param {ICategory} body
 * @param {String} categoryID
 * @returns {ControllerResponse}
 */

//Delete a Category
export const Delete = async (body: ICategory, categoryID: String) => {
  try {
    const category = await Category.findById(categoryID);

    if (!category) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'category not found',
        {},
        null,
        '',
      );
    }

    await Category.findOneAndUpdate(
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
          'category deleted',
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

/**
 *
 * @param {String} categoryID
 * @returns {ControllerResponse}
 */

//Get a single Category
export const GetSingleCategory = async (categoryID: String) => {
  try {
    const category = await Category.findById(categoryID);

    if (!category) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'Category not found',
        {},
        null,
        '',
      );
    }
    return sendResponse(httpStatus.OK, 'Category Found', category, null, '');
  } catch (error) {
    throw new Error(error);
  }
};
