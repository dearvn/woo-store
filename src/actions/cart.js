import _ from 'lodash';
import { createAction, createActions } from 'redux-actions';
import Api from '../api';

const { addToCartTodo, removeProductFromCartTodo, addRemoveCartItemTodo } = createActions({
  'ADD_TO_CART_TODO': (data, quantity) => ({ data, quantity }),
  'REMOVE_PRODUCT_FROM_CART_TODO': (data, totals) => ({ data, totals }),
  'ADD_REMOVE_CART_ITEM_TODO': (data, totals) => ({ data, totals })
});

export const addToCart = (product, quantity = 1, categoryId) => (dispatch, getState) => {
  const { cart } = getState();
  let carts = _.get(cart, 'carts', []);
  let myCart = _.find(carts, (item) => item.productId === product.id);
  if (myCart && !_.isEmpty(myCart)) {
    myCart.quantity = myCart.quantity + quantity;
    carts = _.filter(carts, (item) => item.productId !== product.id);
    carts = _.concat(carts, myCart);
  } else {
    carts = _.concat(carts, { productId: product.id, quantity, categoryId, productData: product });
  }
  dispatch(addToCartTodo(carts, quantity));
};

export const removeProductFromCart = (productId) => (dispatch, getState) => {
  const { cart } = getState();
  let carts = _.get(cart, 'carts', []);
  let totals = _.get(cart, 'totals', 0);
  let myCart = _.find(carts, (item) => item.productId === productId);
  const { quantity } = myCart;
  totals -= quantity;
  carts = _.filter(carts, (item) => item.productId !== productId);
  dispatch(removeProductFromCartTodo(carts, totals));
};

export const addRemoveCartItem = (productId, add = true) => (dispatch, getState) => {
  const { cart } = getState();
  let carts = _.get(cart, 'carts', []);
  let totals = _.get(cart, 'totals', 0);
  let myCart = _.find(carts, (item) => item.productId === productId);
  if (myCart && !_.isEmpty(myCart)) {
    if (!add && myCart.quantity === 1) {
      return;
    } else if (!add && myCart.quantity > 1) {
      myCart.quantity = myCart.quantity - 1;
      totals = cart.totals - 1;
    } else {
      myCart.quantity = myCart.quantity + 1;
      totals = cart.totals + 1;
    }
    carts = carts.map(item => {
      if (item.productId === productId) {
        return myCart;
      }
      return item;
    });
    dispatch(addRemoveCartItemTodo(carts, totals));
  }
};

const updateOrderInfoTodo = createAction('UPDATE_ORDER_INFO_TODO');
export const updateOrderInfo = (data) => (dispatch) => {
  dispatch(updateOrderInfoTodo({ data }));
};

const resetCartTodo = createAction('RESET_CART_TODO');
export const resetCart = () => (dispatch) => {
  dispatch(resetCartTodo());
};