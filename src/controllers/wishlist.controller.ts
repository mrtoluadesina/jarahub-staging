import Wishlist, { Wishlist as WishBody } from '../models/wishlist.model';
import sendResponse from '../helpers/response';

export async function Create(body: WishBody) {
  try {
    const isExisting = await Wishlist.findOne({
      productId: body.productId,
      userId: body.userId,
    });

    if (isExisting) {
      await Wishlist.findOneAndDelete({
        productId: body.productId,
        userId: body.userId,
      });
      return sendResponse(400, 'Item removed wishlist', {}, null, '');
    }

    const wishlistItem = new Wishlist({ ...body, userId: body.id });

    const payload = await wishlistItem.save();

    return sendResponse(201, 'Item added to wishlist', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function GetWishlist() {
  return await Wishlist.find();
}

export async function GetUserWishlist(userId: string) {
  try {
    const payload = await Wishlist.find({ userId });

    return sendResponse(200, 'Success', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function Delete(userId: string, wishlistId: string) {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      _id: wishlistId,
      userId,
    });

    return sendResponse(200, 'Item removed from wishlist', wishlist!, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}
