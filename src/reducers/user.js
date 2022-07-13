import { handleActions } from 'redux-actions';

const initialState = {
  login: {
    status: '',
    result: null,
    error: null,
    requesting: false
  },
  signUp: {
    status: '',
    error: null,
    requesting: false
  },
  forgotPassword: {
    status: '',
    requesting: false,
    error: null
  },
  address: {
    requesting: false,
    error: null,
    status: '',
    result: []
  },
  order: {
    status: '',
    requesting: false,
    error: null,
    result: []
  },
  charge: {
    status: '',
    requesting: false,
    error: null,
    result: null
  },
  updateMetaData: {
    status: '',
    requesting: false,
    error: null
  }
};

export const user = handleActions({
  'USER_SIGNUP_REQUEST': (state, { payload }) => ({
    ...state,
    signUp: {
      ...initialState.signUp,
      requesting: true,
      status: ''
    }
  }),
  'USER_SIGNUP_SUCCESS': (state, { payload }) => ({
    ...state,
    signUp: {
      ...state.signUp,
      status: 'success',
      requesting: false
    }
  }),
  'USER_SIGNUP_FAIL': (state, { payload }) => ({
    ...state,
    signUp: {
      ...state.signUp,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'USER_LOGIN_REQUEST': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      requesting: true,
      status: ''
    }
  }),
  'USER_LOGIN_SUCCESS': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'USER_LOGIN_FAIL': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'USER_LOGOUT_REQUEST': (state, { payload }) => ({
    ...state,
    logout: {
      ...state.logout,
      requesting: true,
      status: ''
    }
  }),
  'USER_LOGOUT_SUCCESS': (state, { payload }) => (initialState),
  'USER_LOGOUT_FAIL': (state, { payload }) => ({
    ...state,
    logout: {
      ...state.logout,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'FORGOT_PASSWORD_REQUEST': (state, { payload }) => ({
    ...state,
    forgotPassword: {
      ...state.forgotPassword,
      requesting: true,
      status: ''
    }
  }),
  'FORGOT_PASSWORD_SUCCESS': (state, { payload }) => ({
    ...state,
    forgotPassword: {
      ...state.forgotPassword,
      status: 'success',
      requesting: false
    }
  }),
  'FORGOT_PASSWORD_FAIL': (state, { payload }) => ({
    ...state,
    forgotPassword: {
      ...state.forgotPassword,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'UPDATE_CUSTOMER_REQUEST': (state, { payload }) => ({
    ...state,
    address: {
      ...state.address,
      status: '',
      requesting: true
    }
  }),
  'UPDATE_CUSTOMER_SUCCESS': (state, { payload }) => ({
    ...state,
    address: {
      ...state.address,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'UPDATE_CUSTOMER_FAIL': (state, { payload }) => ({
    ...state,
    address: {
      ...state.address,
      status: 'fail',
      requesting: false,
      error: payload.error
    }
  }),
  'UPDATE_USER_INFO_TODO': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'CREATE_ORDER_REQUEST': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: true
    }
  }),
  'CREATE_ORDER_SUCCESS': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: false,
      result: [payload.data, ...state.order.result]
    }
  }),
  'CREATE_ORDER_FAIL': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: false,
      error: payload.error
    }
  }),
  'FETCH_ORDER_REQUEST': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: true
    }
  }),
  'FETCH_ORDER_SUCCESS': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'FETCH_ORDER_FAIL': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: false,
      error: payload.error
    }
  }),
  'ADD_HISTORY_ORDER_TODO': (state, { payload }) => ({
    ...state,
    order: {
      ...state.order,
      status: 'success',
      requesting: false,
      result: [payload.data, ...state.order.result]
    }
  }),
  'ADD_CARD_REQUEST': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      requesting: true,
      status: ''
    }
  }),
  'ADD_CARD_SUCCESS': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'ADD_CARD_FAIL': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'STRIPE_DELETE_CARD_REQUEST': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      requesting: true,
      status: ''
    }
  }),
  'STRIPE_DELETE_CARD_SUCCESS': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'STRIPE_DELETE_CARD_FAIL': (state, { payload }) => ({
    ...state,
    login: {
      ...state.login,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'STRIPE_CREATE_CHARGE_REQUEST': (state, { payload }) => ({
    ...state,
    charge: {
      ...state.charge,
      requesting: true,
      status: ''
    }
  }),
  'STRIPE_CREATE_CHARGE_SUCCESS': (state, { payload }) => ({
    ...state,
    charge: {
      ...state.charge,
      status: 'success',
      requesting: false,
      result: payload.data
    }
  }),
  'STRIPE_CREATE_CHARGE_FAIL': (state, { payload }) => ({
    ...state,
    charge: {
      ...state.charge,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
  'UPDATE_USER_META_DATA_REQUEST': (state, { payload }) => ({
    ...state,
    updateMetaData: {
      ...state.updateMetaData,
      requesting: true
    }
  }),
  'UPDATE_USER_META_DATA_SUCCESS': (state, { payload }) => ({
    ...state,
    updateMetaData: {
      ...state.updateMetaData,
      status: 'success',
      requesting: false
    }
  }),
  'UPDATE_USER_META_DATA_FAIL': (state, { payload }) => ({
    ...state,
    updateMetaData: {
      ...state.updateMetaData,
      status: 'error',
      requesting: false,
      error: payload.error
    }
  }),
}, initialState);

export default user;