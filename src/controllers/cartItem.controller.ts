import Cart, { ICartItem } from '../models/cartItem.model';
import ProductDetails, {
  IProductDetails,
} from '../models/productDetails.model';
import Response from '../interfaces/ControllerResponse';
import sendResponse from '../helpers/response';

export async function createCartItem(
  cartItem: ICartItem,
  productId: string,
): Promise<Response> {
  try {
    const productInCart: IProductDetails[] = await ProductDetails.find({
      productId,
      productDetails: cartItem.productDetailsId,
    });

    if (!productInCart.length) {
      const productDetails = new ProductDetails({ productId });
      const newCartItem = new Cart({
        ...cartItem,
        productDetailsId: productDetails._id,
      });

      const productDetailsResponse = await (await productDetails.save()).populate(
        { path: 'productId' },
      );
      const cartItemResponse = await newCartItem.save();
      await cartItemResponse
        .populate({
          path: 'productDetailsId',
          populate: { path: 'productId' },
        })
        .execPopulate();
      const payload = {
        cart: cartItemResponse,
        productDetail: productDetailsResponse,
      };

      return sendResponse(201, 'Item added to cart', payload, null, '');
    }

    const existingCartItem: ICartItem[] = await Cart.find({
      productDetailsId: productInCart[0]._id,
    });

    const updateQuantity = cartItem.quantity + existingCartItem[0].quantity;
    existingCartItem[0].quantity = updateQuantity;

    const payload = await existingCartItem[0].save();

    return sendResponse(200, 'Updated cart', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCartItem(userId: string) {
  try {
    const payload = await Cart.find({ userId });

    if (!payload.length)
      return sendResponse(200, 'Cart empty', payload, null, '');

    return sendResponse(200, 'Items found', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeCartItem(cartItemId: string) {
  try {
    const payload = await Cart.findByIdAndDelete(cartItemId);

    return sendResponse(200, 'Item deleted', payload!.toObject(), null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}
