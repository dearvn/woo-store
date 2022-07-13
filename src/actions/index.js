import * as userActions from './user';
import * as productActions from './product';
import * as eventActions from './event';
import * as cartActions from './cart';
import * as wishListActions from './wishList';

export default {
  ...userActions,
  ...productActions,
  ...cartActions,
  ...eventActions,
  ...wishListActions
};
