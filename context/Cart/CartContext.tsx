import { createContext } from "react";
import { ICartProduct } from "../../interfaces/cart";

interface ContextProps {
  products: Array<ICartProduct>;
  quantity: number;
  total: number;
  subTotal: number;
  discount: number;

  // Methods
  addProduct: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
