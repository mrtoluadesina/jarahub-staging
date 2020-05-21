import Brand, { Brand as IBrand } from '../models/brand.model';
import sendResponse from '../helpers/response';
import { getCollection } from '../helpers/paginator';
import Response from '../interfaces/ControllerResponse';

export async function create(body: IBrand): Promise<Response> {
  try {
    const brand = new Brand(body);
    const payload = await brand.save();

    return sendResponse(200, 'Brand Created', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteBrand(id: String): Promise<Response> {
  try {
    const payload = Brand.deleteOne({ _id: id });
    return sendResponse(200, 'Brand Deleted', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getBrands(query:{}) {
  const payload = await getCollection(Brand, query);

  return sendResponse(200, 'Success', payload, null, '');
}

export async function getSingleBrand(brandId: string) {
  try {
    const payload = Brand.findById(brandId);

    if (!payload) return sendResponse(404, 'Brand not found', {}, null, '');

    return sendResponse(200, 'Brand Found', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}
