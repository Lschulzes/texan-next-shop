import axios from 'axios';
import { default as Cookie, default as Cookies } from 'js-cookie';
import { ReactNode, useEffect, useReducer } from 'react';
import { CartContext, CartReducer } from '.';
import { texanAPI } from '../../api';
import { IOrderItem } from '../../interfaces';
import { ICartProduct } from '../../interfaces/cart';
import { getAddressDataFromCookies } from '../../pages/checkout/address';
import { BillingAddress } from './CartContext';

export interface CartState {
  products: Array<ICartProduct>;
  quantity: number;
  total: number;
  subTotal: number;
  discount: number;
  isLoading: boolean;
  billingAddress?: BillingAddress;
}

export type CreateOrderDispatch = { user: string; items: Array<IOrderItem>; billingAddress: BillingAddress };

const CART_INITIAL_STATE: CartState = {
  products: [],
  quantity: 0,
  total: 0,
  discount: 0,
  subTotal: 0,
  isLoading: true,
};

type CartProviderProps = {
  children: ReactNode;
};

export const CART_KEY = 'texan_shop_cart';

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProductsJSON = Cookie.get(CART_KEY);
      if (cookieProductsJSON) {
        const cookieProducts = JSON.parse(cookieProductsJSON);

        dispatch({
          type: 'Cart - Load from cookies | storage',
          payload: cookieProducts,
        });
      }
    } catch (error) {
      dispatch({
        type: 'Cart - Load from cookies | storage',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'Cart - Update Stats' });

    Cookie.set(CART_KEY, JSON.stringify(state.products));
  }, [state.products]);

  const addProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Add Product', payload: { ...product } });
  };

  const updateProductQuantity = (product: ICartProduct) => {
    dispatch({
      type: 'Cart - Update Product Quantity',
      payload: { ...product },
    });
  };

  const removeProduct = (product: ICartProduct) => {
    dispatch({
      type: 'Cart - Remove Product',
      payload: { ...product },
    });
  };

  const removeAllProducts = () => {
    dispatch({ type: 'Cart - Remove All Products' });
  };

  const updateBillingAddress = (billingAddress: BillingAddress) => {
    Cookies.set('address_data', JSON.stringify(billingAddress));
    dispatch({
      type: 'Cart - update Billing Address',
      payload: billingAddress,
    });
  };

  const createOrder = async (orderData: CreateOrderDispatch): Promise<CreateOrderReturn> => {
    try {
      const { data } = await texanAPI.post('/orders', orderData);

      return {
        hasError: false,
        _id: data.data._id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: (error.response?.data as { message: string }).message,
        };
      }
      return {
        hasError: true,
        message: 'Internal error',
      };
    }
  };

  useEffect(() => {
    const billingAddress = getAddressDataFromCookies();
    if (!billingAddress.name.length) return;

    updateBillingAddress(billingAddress);
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProduct,
        updateProductQuantity,
        removeProduct,
        removeAllProducts,
        updateBillingAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export type CreateOrderReturn =
  | {
      hasError: true;
      message: string;
    }
  | {
      hasError: false;
      _id: string;
    };
