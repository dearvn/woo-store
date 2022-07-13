import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import nav from './nav';
import user from './user';
import product from './product';
import event from './event';
import cart from './cart';
import wishList from './wishList';

const config = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'wishList']
};

export default persistCombineReducers(config, {
  nav,
  user,
  product,
  event,
  cart,
  wishList
});
