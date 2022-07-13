import { createContext } from "react";
import { ICartProduct } from "../../interfaces/cart";

interface ContextProps {
  products: Array<ICartProduct>;

  // Methods
  addProduct: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
