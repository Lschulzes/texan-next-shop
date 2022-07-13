import { ReactNode, useEffect, useReducer } from "react";
import { CartContext, CartReducer } from ".";
import { ICartProduct } from "../../interfaces/cart";
import Cookie from "js-cookie";

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

  useEffect(() => {
    try {
      const cookieProductsJSON = Cookie.get("texan_shop_cart");
      if (cookieProductsJSON) {
        const cookieProducts = JSON.parse(cookieProductsJSON);

        dispatch({
          type: "Cart - Load from cookies | storage",
          payload: cookieProducts,
        });
      }
    } catch (error) {
      dispatch({
        type: "Cart - Load from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set("texan_shop_cart", JSON.stringify(state.products));
  }, [state.products]);

  const addProduct = (product: ICartProduct) => {
    dispatch({ type: "Cart - Add Product", payload: { ...product } });
  };

  const updateProductQuantity = (product: ICartProduct) => {
    dispatch({
      type: "Cart - Update Product Quantity",
      payload: { ...product },
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProduct,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
