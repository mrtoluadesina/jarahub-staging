import { IOrder } from '../models/order.model';
import { IOrderItem } from '../models/orderItem.model';

export interface OrderBody {
  order: IOrder;
  cartItems: Array<IOrderItem>;
}
