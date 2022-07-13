import { handleActions } from 'redux-actions';

const initialState = {
  fetchAllProduct: {
    status: '',
    result: [],
    error: null,
    requesting: false,
    canLoadMore: true,
    page: 1
  },
  fetchAllOfferProduct: {
    status: '',
    result: [],
    error: null,
    requesting: false,
    canLoadMore: true,
    page: 1
  },
  categories: {
    status: '',
    result: null,
    error: null,
    requesting: false
  },
  productByCategories: {
    status: '',
    result: null,
    error: null,
    requesting: null
  },
  coupons: {
    status: '',
    result: null,
    error: null,
    requesting: false
  },
  shippingMethod: {
    status: '',
    result: null,
    error: null,
    requesting: false
  }
};

export const product = handleActions({
  'FETCH_ALL_OFFER_PRODUCT_REQUEST': (state, { payload }) => ({
    ...state,
    fetchAllOfferProduct: {
      ...state.fetchAllOfferProduct,
      requesting: true,
      status: ''
    }
  }),
  'FETCH_ALL_OFFER_PRODUCT_SUCCESS': (state, { payload }) => ({
    ...state,
    fetchAllOfferProduct: {
      ...state.fetchAllOfferProduct,
      status: 'success',
      result: payload.data,
      page: payload.page,
      canLoadMore: payload.canLoadMore,
      requesting: false
    }
  }),
  'FETCH_ALL_OFFER_PRODUCT_FAILURE': (state, { payload }) => ({
    ...state,
    fetchAllOfferProduct: {
      ...state.fetchAllOfferProduct,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'FETCH_ALL_PRODUCT_REQUEST': (state, { payload }) => ({
    ...state,
    fetchAllProduct: {
      ...state.fetchAllProduct,
      requesting: true,
      status: ''
    }
  }),
  'FETCH_ALL_PRODUCT_SUCCESS': (state, { payload }) => ({
    ...state,
    fetchAllProduct: {
      ...state.fetchAllProduct,
      status: 'success',
      result: payload.data,
      page: payload.page,
      canLoadMore: payload.canLoadMore,
      requesting: false
    }
  }),
  'FETCH_ALL_PRODUCT_FAILURE': (state, { payload }) => ({
    ...state,
    fetchAllProduct: {
      ...state.fetchAllProduct,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'FETCH_CATEGORIES_REQUEST': (state, { payload }) => ({
    ...state,
    categories: {
      ...initialState.categories,
      requesting: true,
      status: ''
    }
  }),
  'FETCH_CATEGORIES_SUCCESS': (state, { payload }) => ({
    ...state,
    categories: {
      ...state.categories,
      status: 'success',
      result: payload.data,
      requesting: false
    }
  }),
  'FETCH_CATEGORIES_FAILURE': (state, { payload }) => ({
    ...state,
    categories: {
      ...state.categories,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'FETCH_PRODUCT_BY_CATEGORIES_REQUEST': (state, { payload }) => ({
    ...state,
    productByCategories: {
      ...state.productByCategories,
      requesting: true,
      status: ''
    }
  }),
  'FETCH_PRODUCT_BY_CATEGORIES_SUCCESS': (state, { payload }) => ({
    ...state,
    productByCategories: {
      ...state.productByCategories,
      status: 'success',
      result: payload.data,
      requesting: false
    }
  }),
  'FETCH_PRODUCT_BY_CATEGORIES_FAILURE': (state, { payload }) => ({
    ...state,
    productByCategories: {
      ...state.productByCategories,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'FETCH_COUPONS_REQUEST':  (state, { payload }) => ({
    ...state,
    coupons: {
      ...state.coupons,
      status: '',
      requesting: true
    }
  }),
  'FETCH_COUPONS_SUCCESS':  (state, { payload }) => ({
    ...state,
    coupons: {
      ...state.coupons,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'FETCH_COUPONS_FAILURE':  (state, { payload }) => ({
    ...state,
    coupons: {
      ...state.coupons,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'FETCH_SHIPPING_METHOD_REQUEST':  (state, { payload }) => ({
    ...state,
    shippingMethod: {
      ...state.shippingMethod,
      status: '',
      requesting: true
    }
  }),
  'FETCH_SHIPPING_METHOD_SUCCESS':  (state, { payload }) => ({
    ...state,
    shippingMethod: {
      ...state.shippingMethod,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'FETCH_SHIPPING_METHOD_FAILURE':  (state, { payload }) => ({
    ...state,
    shippingMethod: {
      ...state.shippingMethod,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
}, initialState);

export default product;