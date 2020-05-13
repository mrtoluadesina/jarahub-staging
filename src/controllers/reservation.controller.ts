import Reservation, { IReservation } from '../models/reservation.model';
import User from '../models/user.model';
import sendResponse from '../helpers/response';
import { init } from './transaction.controller';


export async function create(adminId: string, body: IReservation) {
  try {
    const reservation = new Reservation({ adminId, ...body });

    // get user by email
    let user = await User.findOne({ email: body.userDetails.email });


    // if user does not exist create user
    if (!user) {
      user = new User({ ...body.userDetails, isGuest: true });
    }
    // save user
    await user.save()

    // create body to initialize the transaction
    let transactionBody = {
      isPickUp: body.isPickup,
      items : body.productIds.map(({ productId, quantity }) => {
        return {
          productDetailsId: productId,
          quantity: quantity
        }
      }),
      chargedAmount: body.chargedAmount,
      billing: {
        address1: body.userDetails.address,
        ...body.userDetails
      }
    }
    //create a transaction
    const { payload } = await init(
      user,
      // @ts-ignore
      transactionBody,
    );
    reservation.userId = user._id;
    reservation.transactionId = payload._id
    await reservation.save();
    return sendResponse(
      200,
      'Success',
      { user, reservation },
      null,
      '',
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
