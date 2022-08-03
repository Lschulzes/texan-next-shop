import { BillingAddress } from '../context';
import { ICartProduct } from './cart';
import { IUser } from './user';

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: Array<IOrderItem>;
  billingAddress: BillingAddress;
  discount: number;
  subTotal: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;

  createdAt?: string;
  updatedAt?: string;
}

export type IOrderItem = Omit<ICartProduct, 'inStock' | 'gender'>;
