import { createContext, useContext } from "react";
import { ICartProduct } from "../../interfaces/cart";
import { COUNTRIES } from "../../utils";

export type BillingAddress = {
  name: string;
  lastName: string;
  address: string;
  ZIP: string;
  country: typeof COUNTRIES[0]["code"];
  phoneNumber: string;
};
interface ContextProps {
  products: Array<ICartProduct>;
  quantity: number;
  total: number;
  subTotal: number;
  discount: number;
  isLoading: boolean;

  billingAddress?: BillingAddress;

  // Methods
  addProduct: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeProduct: (product: ICartProduct) => void;
  removeAllProducts: () => void;
  updateBillingAddress: (billingAddress: BillingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);

export const useCart = () => useContext(CartContext);
