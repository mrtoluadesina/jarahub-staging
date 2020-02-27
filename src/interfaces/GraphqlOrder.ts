import { IOrder } from '../models/order.model';

export interface IOrderInterface {
  statusCode: number;
  message: string;
  payload?: IOrder;
}
