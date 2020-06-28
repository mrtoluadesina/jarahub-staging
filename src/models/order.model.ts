import { Schema, Document, Types, model } from 'mongoose';

// enum OrderStatus {
//   'Pending',
//   'In-Progress',
//   'Completed',
//   'Failed',
//   'Cancelled',
// }

export interface IOrder extends Document {
  userId: Types.ObjectId;
  addressId: Types.ObjectId;
  discountId: Types.ObjectId;
  status?: String;
  amount: Number;
  orderItems: String[];
  createdAt: Date;
}

const OrderModel = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addressId: {
      type: Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    discountId: {
      type: Types.ObjectId,
      ref: 'Discount',
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Progress', 'Completed', 'Failed', 'Cancelled'],
      default: 'Pending',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [{ type: Types.ObjectId, ref: 'OrderItem' }],
    },
  },
  {
    timestamps: true,
  },
);

OrderModel.pre('findOne', function(next) {
  this.populate({ path: 'userId' });
  this.populate({ path: 'addressId' });
  this.populate({ path: 'orderItems' });
  this.populate({ path: 'discountId' });
  next();
});
OrderModel.pre('find', function(next) {
  this.populate({ path: 'userId' });
  this.populate({ path: 'addressId' });
  this.populate({ path: 'orderItems' });
  this.populate({ path: 'discountId' });
  next();
});

OrderModel.post('save', function(doc, next) {
  doc
    .populate({ path: 'userId', select: '-password' })
    .populate({ path: 'addressId' })
    .populate({ path: 'orderItems' }) //, populate: { path: 'productDetailsId'}})
    .execPopulate()
    .then(function() {
      next();
    });
});

OrderModel.statics = {
  async getByRange(range: String = 'week') {
    console.log('print...', range);
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

export default model<IOrder>('Order', OrderModel);
