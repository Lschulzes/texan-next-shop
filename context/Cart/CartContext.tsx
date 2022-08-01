import { createContext, useContext } from "react";
import { ICartProduct } from "../../interfaces/cart";

interface ContextProps {
  products: Array<ICartProduct>;
  quantity: number;
  total: number;
  subTotal: number;
  discount: number;
  isLoading: boolean;

  // Methods
  addProduct: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeProduct: (product: ICartProduct) => void;
  removeAllProducts: () => void;
}

export const CartContext = createContext({} as ContextProps);

export const useCart = () => useContext(CartContext);
