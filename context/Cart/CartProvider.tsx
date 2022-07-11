import { ReactNode, useReducer } from "react";
import { CartContext, CartReducer } from ".";
import { ICartProduct } from "../../interfaces/cart";

export interface CartState {
  products: Array<ICartProduct>;
  quantity: number;
  price: number;
}

const CART_INITIAL_STATE: CartState = {
  products: [],
  quantity: 0,
  price: 0,
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  const addProduct = (product: ICartProduct) =>
    dispatch({ type: "Cart - Add Product", payload: product });

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
