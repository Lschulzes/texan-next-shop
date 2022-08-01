import Cookies from "js-cookie";
import { ICartProduct } from "../../interfaces/cart";
import { CartState, CART_KEY } from "./CartProvider";

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
    }
  | {
      type: "Cart - Remove All Products";
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
        isLoading: false,
        products: action.payload,
      };

    case "Cart - Update Product Quantity":
      return updateProductQuantity(state, action.payload);

    case "Cart - Remove Product":
      return removeProduct(state, action.payload);

    case "Cart - Remove All Products":
      return removeAllProducts(state);

    case "Cart - Update Stats":
      return updateStats(state);

    default:
      return state;
  }
};

const updateStats = (state: CartState): CartState => {
  const { products = [] } = state;
  const subTotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = subTotal * +(process.env.NEXT_PUBLIC_DISCOUNT || 0);
  const quantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const total = subTotal - discount;

  return { ...state, subTotal, discount, quantity, total };
};

const removeProduct = (state: CartState, payload: ICartProduct): CartState => {
  const products = state.products.filter(
    (product) => !(product._id === payload._id && product.size === payload.size)
  );

  return { ...state, products };
};

const removeAllProducts = (state: CartState): CartState => {
  return { ...state, products: [] };
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
