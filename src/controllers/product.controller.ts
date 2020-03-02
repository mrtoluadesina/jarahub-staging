import Product, { IProduct } from '../models/product.model';
import Category from '../models/category.model';
import elasticsearch from '../elasticsearch/config';

import sendResponse from '../helpers/response';
import httpStatus from 'http-status';
import removeDuplicates from '../helpers/removeDuplicateSearchObjects';

//Get All Products
export const getAllProducts = async () =>
  await Product.find({ isDeleted: false })
    .populate('categoryId')
    .exec();

//Create a Product
export const Create = async (body: IProduct) => {
  try {
    const { name } = body;

    const Exist = await Product.findOne({ name });

    if (Exist) {
      return sendResponse(
        httpStatus.OK,
        'There is a product with this name',
        {},
        null,
        '',
      );
    }

    const product = new Product(body);

    let indexId = product._id.toString();

    let bulkBody: any = [];

    body.name.split(' ').forEach(word => {
      bulkBody.push({
        index: {
          _index: word.toLowerCase(),
          _type: 'product',
          _id: indexId,
        },
      });
      bulkBody.push({
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        sku: product.sku,
        specification: product.specification,
        quantity: product.quantity,
        totalStock: product.totalStock,
        price: product.price,
        images: product.images,
        isDeleted: product.isDeleted,
        inStock: product.isInStock,
        discountId: product.discountId,
        tags: product.tags,
      });
    });

    elasticsearch.bulk({ body: bulkBody, refresh: true }, function(
      err,
      _response,
    ) {
      if (err) {
        console.log('Error: ', err);
      }
    });
    const savePayload = product.save();

    const [payload] = await Promise.all([savePayload]);

    return sendResponse(httpStatus.OK, 'product created', payload, null, '');
  } catch (error) {
    throw new Error(error);
  }
};

//Update a Product
export const Update = async (body: IProduct, productID: String) => {
  try {
    const product = await Product.findById(productID);

    if (!product) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'product not found',
        {},
        null,
        '',
      );
    }

    await Product.findOneAndUpdate(
      { _id: body._id },
      { $set: body },
      { new: true },
      (err, result) => {
        if (err) {
          return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'an error occured',
            {},
            null,
            '',
          );
        }
        return sendResponse(
          httpStatus.OK,
          'product updated',
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

//Delete a Product
export const Delete = async (body: IProduct, productID: String) => {
  try {
    const product = await Product.findById(productID);

    if (!product) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'product not found',
        {},
        null,
        '',
      );
    }

    await Product.findOneAndUpdate(
      { _id: body._id },
      { $set: { isDeleted: true } },
      { new: true },
      (err, result) => {
        if (err) {
          return sendResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            'an error occured',
            {},
            null,
            '',
          );
        }
        return sendResponse(
          httpStatus.OK,
          'product is deleted',
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

//Get a single Product
export const GetASingleProduct = async (productID: String) => {
  try {
    const product = await Product.findById(productID);

    if (!product) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'product not found',
        {},
        null,
        '',
      );
    }

    return sendResponse(
      httpStatus.OK,
      'this is the product',
      product,
      null,
      '',
    );
  } catch (error) {
    try {
      const product = await Product.findOne({ name: productID });
      console.log(product);
      if (!product) {
        return sendResponse(404, 'product not found', {}, null, '');
      }

      return sendResponse(200, 'Product found by name', product, null, '');
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const search = async (query: string) => {
  try {
    let searchResult: any;

    const splittedQuery = query.split(' ');

    if (splittedQuery.length < 2) {
      let singleSearchResult = await elasticsearch.search({
        index: query,
        body: {
          query: {
            match: {
              name: `${query}*`,
            },
          },
        },
      });
      return sendResponse(
        200,
        'Search Result',
        singleSearchResult.hits.hits,
        null,
        '',
      );
    }
    let bulkQuery: any[] = [];

    splittedQuery.forEach(word => {
      bulkQuery.push({ index: word });
      bulkQuery.push({
        query: { match: { name: { query: `${word}*`, fuzziness: 'auto' } } },
      });
    });

    searchResult = await elasticsearch.msearch({ body: bulkQuery });

    let filtered = removeDuplicates(
      searchResult.responses.map((item: any) => {
        try {
          return item.hits.hits[0]._source;
        } catch (error) {
          return { name: null };
        }
      }),
      'name',
    );

    return sendResponse(200, 'Search Result', filtered, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const filterByCategory = async (filterParam: string) => {
  try {
    const pattern = new RegExp(filterParam, 'ig');
    const category = await Category.findOne({ name: { $regex: pattern } });
    if (!category)
      return sendResponse(
        404,
        'Category does not exist or has been deleted',
        {},
        null,
        '',
      );
    const products = await Product.find({
      categoryId: { $in: [category._id] },
    });
    return sendResponse(200, 'Success', products, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllProductsPaginated = async (pageNumber: number) => {
  let pageNo: number = pageNumber || 0;
  let limit: number = 10;
  let skip = pageNo * (limit - 1);
  let count = await Product.countDocuments({}, function(err, _count) {
    if (err) {
      throw new Error(err.message);
    }
  });

  if (!count) return sendResponse(404, 'No data was found', {}, null, '');

  let payload = await Product.find()
    .skip(skip)
    .limit(limit);

  return sendResponse(200, 'Products found', payload, null, '');
};

export const getProductsByCategoryWithPagination = async (
  pageNumber: number,
  filterParam: string,
) => {
  try {
    let pageNo: number = pageNumber || 0;
    let limit: number = 12;
    let skip: number = pageNo * (limit - 1);
    const pattern = new RegExp(filterParam, 'ig');
    const category = await Category.findOne({ name: { $regex: pattern } });
    if (!category)
      return sendResponse(
        404,
        'Category does not exist or has been deleted',
        {},
        null,
        '',
      );
    let categoryCount = await Product.countDocuments(
      {
        categoryId: { $in: [category._id] },
      },
      function(err, _count) {
        if (err) throw new Error(err.message);
      },
    );
    if (!categoryCount)
      return sendResponse(404, 'No product in this category', {}, null, '');

    let payload = await Product.find({
      categoryId: { $in: [category._id] },
    })
      .skip(skip)
      .limit(limit);

    return sendResponse(
      200,
      `Products found in ${filterParam}`,
      { data: payload, count: categoryCount },
      null,
      '',
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
