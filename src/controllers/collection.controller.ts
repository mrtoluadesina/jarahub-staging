import Collection, { ICollection } from '../models/collection.model';
import sendResponse from '../helpers/response';

export async function Create(body: ICollection) {
  try {
    const isExist = await Collection.findOne({ name: body.name });

    if (isExist)
      return sendResponse(
        400,
        'Collection with this name already exist',
        {},
        null,
        '',
      );

    const collection = new Collection(body);

    if (body.priority == 0) {
      const countHighPriority = await Collection.count({
        priority: body.priority,
      });
      if (countHighPriority >= 4) {
        return sendResponse(
          400,
          'Collection of high priority would be displayed on home page and can only be four',
          {},
          null,
          '',
        );
      }
      const response = await collection.save();

      return sendResponse(201, 'Collection Created', response, null, '');
    }

    const payload = await collection.save();

    return sendResponse(200, 'Collection Created', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}
