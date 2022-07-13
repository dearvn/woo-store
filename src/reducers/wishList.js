import { handleActions } from 'redux-actions';

const initialState = {
  results: [],
  ids: []
};

export const wishList = handleActions({
  'TOGGLE_WISH_LIST_TODO': (state, { payload }) => ({
    ...state,
    results: payload.results,
    ids: payload.ids
  })
}, initialState);

export default wishList;