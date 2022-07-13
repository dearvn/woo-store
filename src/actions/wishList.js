import _ from 'lodash';
import { createAction } from 'redux-actions';

const toggleWishListToto = createAction('TOGGLE_WISH_LIST_TODO');

export const toggleWishList = (product) => (dispatch, getState) => {
  const { wishList } = getState();
  let results = _.get(wishList, 'results', []);
  let myWishList = _.find(results, (item) => item.id === product.id);
  results = myWishList ? _.filter(results, item => item.id !== product.id) : _.concat(results, product);
  const ids = results.map(item => item.id);
  dispatch(toggleWishListToto({ results, ids }));
};