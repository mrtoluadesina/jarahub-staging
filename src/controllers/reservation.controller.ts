import Reservation, { IReservation } from '../models/reservation.model';
import User from '../models/user.model';
import sendResponse from '../helpers/response';

export async function create(adminId: string, body: IReservation) {
  try {
    const reservation = new Reservation({ adminId, ...body });

    const isUserExist = await User.findOne({ email: body.userDetails.email });

    let newUser;

    if (!isUserExist) {
      newUser = new User(body.userDetails);
      reservation.userId = newUser._id;
      const [user, reserve] = await Promise.all([
        newUser.save(),
        reservation.save(),
      ]);
      return sendResponse(
        200,
        'Success',
        { user, reservation: reserve },
        null,
        '',
      );
    }
    reservation.userId = isUserExist._id;
    await reservation.save();
    return sendResponse(
      200,
      'Success',
      { user: isUserExist, reservation },
      null,
      '',
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
