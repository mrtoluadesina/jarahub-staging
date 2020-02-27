import Review, { Review as IReview } from '../models/reviews.model';
import sendResponse from '../helpers/response';

export async function create(body: IReview, productId: string) {
  try {
    const review = new Review({ productId, ...body });
    const payload = await review.save();
    return sendResponse(200, 'Review Submitted', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductReview(productId: string) {
  try {
    const reviews = await Review.find({ _id: productId });
    if (!reviews.length)
      return sendResponse(
        404,
        'No reviews for this product',
        reviews,
        null,
        '',
      );

    return sendResponse(200, 'Successful', reviews, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}
