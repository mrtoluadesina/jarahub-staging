import ExchangeRate, { ExchangeRateType } from '../models/exchangerate.model';
import Response from '../interfaces/ControllerResponse';
import Joi from '@hapi/joi';
import sendResponse from '../helpers/response';
import httpStatus from 'http-status';

const ExchangeRateValidator = Joi.object().keys({
  icon: Joi.string().required(),
  rate: Joi.number()
    .integer()
    .max(1000)
    .required(),
  code: Joi.string().required(),
  sign: Joi.string()
    .max(1)
    .required(),
  country: Joi.string().required(),
});

export async function create(data: ExchangeRateType): Promise<Response> {
  try {
    const { value, error } = ExchangeRateValidator.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { icon, rate, code, sign, country } = value;

    const exchangeRateExist = await ExchangeRate.findOne({ country });

    if (exchangeRateExist) {
      throw new Error('Rate exists');
    }

    const exchangeRate = new ExchangeRate({ icon, rate, code, sign, country });
    const newRate = await exchangeRate.save();

    return sendResponse(
      httpStatus.CREATED,
      'Exchange rate created',
      newRate,
      null,
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

const UpdateRateSchema = Joi.object().keys({
  rate: Joi.number()
    .integer()
    .max(1000)
    .required(),
});

export async function update(
  rateID: string,
  data: { rate: number },
): Promise<Response> {
  try {
    const { value, error } = UpdateRateSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { rate } = value;

    const exchangeRate = await ExchangeRate.findOneAndUpdate(
      { _id: rateID },
      { $set: { rate } },
      { new: true },
    );

    return sendResponse(
      httpStatus.OK,
      'Excahnge rate updated',
      exchangeRate,
      null,
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExchangeRates(): Promise<Response> {
  try {
    const exchangeRates = await ExchangeRate.find();

    return sendResponse(
      httpStatus.OK,
      'Rates Found',
      exchangeRates,
      null,
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExchangeRate(rateID: string): Promise<Response> {
  try {
    const exchangeRate = await ExchangeRate.findById(rateID);

    if (!exchangeRate) {
      return sendResponse(
        httpStatus.NOT_FOUND,
        'Rate not found',
        null,
        null,
        null,
      );
    }

    return sendResponse(httpStatus.OK, 'Rate found', exchangeRate, null, null);
  } catch (error) {
    throw new Error(error.message);
  }
}
