import { ICartProduct } from "../../interfaces/cart";
import { CartState } from "./CartProvider";

type CartActionType =
  | { type: "Cart - Add Product"; payload: ICartProduct }
  | {
      type: "Cart - Load from cookies | storage";
      payload: Array<ICartProduct>;
    }
  | {
      type: "Cart - Update Product Quantity";
      payload: ICartProduct;
    };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - Add Product":
      return addProduct(state, action.payload);

    case "Cart - Load from cookies | storage":
      return {
        ...state,
        products: action.payload,
      };

    case "Cart - Update Product Quantity":
      return updateProductQuantity(state, action.payload);
    default:
      return state;
  }
};

const updateProductQuantity = (
  state: CartState,
  payload: ICartProduct
): CartState => {
  state.products.map((product) => {
    if (product._id === payload._id) return product;
    if (product.size === payload.size) return product;

    return payload;
  });

  return { ...state };
};

const addProduct = (state: CartState, payload: ICartProduct): CartState => {
  const productIndex = state.products.findIndex(
    (product) => product._id === payload._id && product.size === payload.size
  );

  if (productIndex >= 0) {
    const products = state.products;
    products[productIndex].quantity += payload.quantity;

    return { ...state, products };
  }

  return { ...state, products: state.products.concat(payload) };
};
