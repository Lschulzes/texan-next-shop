import { ReactNode, useEffect, useReducer } from "react";
import { CartContext, CartReducer } from ".";
import { ICartProduct } from "../../interfaces/cart";
import Cookie from "js-cookie";

export interface CartState {
  products: Array<ICartProduct>;
  quantity: number;
  total: number;
  subTotal: number;
  discount: number;
}

const CART_INITIAL_STATE: CartState = {
  products: [],
  quantity: 0,
  total: 0,
  discount: 0,
  subTotal: 0,
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
    dispatch({ type: "Cart - Update Stats", payload: state.products });
  }, [state.products]);

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
    dispatch({ type: "Cart - Update Stats", payload: state.products });
  };

  const removeProduct = (product: ICartProduct) => {
    dispatch({
      type: "Cart - Remove Product",
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
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
