import mongoose, { model, Model, Schema } from 'mongoose';
import { IOrder } from '../interfaces';

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        size: {
          type: String,
          enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: '{VALUE} is not a valid size.',
          },
          required: true,
        },
        slug: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    billingAddress: {
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      ZIP: { type: String, required: true },
      country: {
        type: String,
        enum: {
          values: ['USA', 'CND', 'MEX'],
          message: '{VALUE} is not a valid country.',
        },
        required: true,
      },
      phoneNumber: { type: String, required: true },
    },
    discount: { type: Number, default: 0 },
    paidAt: { type: String },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
  },

  {
    timestamps: true,
  },
);

export const OrderModel: Model<IOrder> = mongoose.models.Order || model('Order', OrderSchema, 'orders');

export default OrderModel;
