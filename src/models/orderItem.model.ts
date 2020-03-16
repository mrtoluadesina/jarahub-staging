import mongoose, { Schema } from 'mongoose';

export interface IOrderItem extends mongoose.Document {
  orderId: mongoose.Types.ObjectId;
  productDetailsId: mongoose.Types.ObjectId;
  quantity: Number;
  isWholeSale: Boolean;
  amount: number;
  createdAt: Date;
}

const OrderItemModel = new Schema(
  {
    orderId: { type: mongoose.Types.ObjectId, ref: 'Order', required: true },
    productDetailsId: {
      type: mongoose.Types.ObjectId,
      ref: 'ProductDetails',
      required: true,
    },
    quantity: { type: Number, required: true },
    isWholeSale: { type: Boolean, required: true, default: false },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

OrderItemModel.statics = {
  async getByRange(range: String = 'week') {
    /*
    if range is year, get year beginning eqivalent
    if range is month, get month beginning
    if range is week, get week beginning eqivalent
    */
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate();
    let week = date.getUTCDay();

    let dateStart;
    switch (range.toLocaleLowerCase()) {
      case 'year':
        dateStart = new Date(`${year}-${1}`);
        break;
      case 'month':
        dateStart = new Date(`${year}-${month + 1}`);
        break;
      default:
        dateStart = new Date(`${year}-${month + 1}-${day - week}`);
        break;
    }
    let order = await this.find({
      createdAt: {
        $gt: dateStart,
      },
    });
    return order;
  },
};

export default mongoose.model<IOrderItem>('OrderItem', OrderItemModel);
