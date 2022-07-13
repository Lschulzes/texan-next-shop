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
    }
  | {
      type: "Cart - Remove Product";
      payload: ICartProduct;
    }
  | {
      type: "Cart - Update Stats";
      payload: Array<ICartProduct>;
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

    case "Cart - Remove Product":
      return removeProduct(state, action.payload);

    case "Cart - Update Stats":
      return updateStats(state, action.payload);

    default:
      return state;
  }
};

const updateStats = (
  state: CartState,
  payload: Array<ICartProduct>
): CartState => {
  const subTotal = payload.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = subTotal * 0.1;
  const quantity = payload.reduce((acc, product) => acc + product.quantity, 0);
  const total = subTotal - discount;

  return { ...state, subTotal, discount, quantity, total };
};

const removeProduct = (state: CartState, payload: ICartProduct): CartState => {
  const products = state.products.filter(
    (product) => !(product._id === payload._id && product.size === payload.size)
  );

  return { ...state, products };
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