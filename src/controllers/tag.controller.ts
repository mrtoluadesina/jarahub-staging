import Tag, { ITag } from '../models/tag.model';
import sendResponse from '../helpers/response';
import httpStatus from 'http-status';

//Get all tags
export const GetAllTags = () => Tag.find();

//Get one tag
export const GetSingleTag = async (tagID: String) => {
  try {
    const tag = await Tag.findById(tagID);

    if (!tag) {
      return sendResponse(httpStatus.NOT_FOUND, 'tag not found', {}, null, '');
    }

    return sendResponse(httpStatus.OK, 'Tag found', tag, null, '');
  } catch (error) {
    throw new Error(error);
  }
};

//Create Tag
export const Create = async (body: ITag) => {
  try {
    const { tag } = body;

    const Exist = await Tag.findOne({ tag });

    if (Exist) {
      return sendResponse(httpStatus.OK, 'Tag already exists', {}, null, '');
    }

    const newTag = new Tag(body);
    const payload = await newTag.save();

    return sendResponse(httpStatus.OK, 'Tag created', payload, null, '');
  } catch (error) {
    throw new Error(error);
  }
};

//Delete a Tag
export const Delete = async (tagID: String) => {
  try {
    const tag = await Tag.findById(tagID);

    if (!tag) {
      return sendResponse(httpStatus.NOT_FOUND, 'Tag not found', {}, null, '');
    }

    await Tag.findOneAndDelete({ _id: tag._id });
    return sendResponse(httpStatus.OK, 'Tag Deleted', {}, null, '');
  } catch (error) {
    throw new Error(error);
  }
};
