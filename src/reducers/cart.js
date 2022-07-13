import { handleActions } from 'redux-actions';

const initialState = {
  carts: [],
  totals: 0,
  orderInfo: null
};

export const cart = handleActions({
  'ADD_TO_CART_TODO': (state, { payload }) => ({
    ...state,
    carts: payload.data,
    totals: state.totals + payload.quantity
  }),
  'REMOVE_PRODUCT_FROM_CART_TODO': (state, { payload }) => ({
    ...state,
    carts: payload.data,
    totals: payload.totals
  }),
  'ADD_REMOVE_CART_ITEM_TODO': (state, { payload }) => ({
    ...state,
    carts: payload.data,
    totals: payload.totals
  }),
  'UPDATE_ORDER_INFO_TODO': (state, { payload }) => ({
    ...state,
    orderInfo: payload.data
  }),
  'RESET_CART_TODO': (state, { payload }) => ({
    ...state,
    carts: [],
    totals: 0,
    orderInfo: null
  })
}, initialState);

export default cart;