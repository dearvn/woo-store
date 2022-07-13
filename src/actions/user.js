import { createAction, createActions } from 'redux-actions';
import Api from '../api';
import Stripe from '../services/stripe';
import { getMetaData, handdleErrors } from '../utils/general';
import _ from 'lodash';

const { userLoginRequest, userLoginSuccess, userLoginFail } = createActions({
  'USER_LOGIN_REQUEST': () => {},
  'USER_LOGIN_SUCCESS': data => ({ data }),
  'USER_LOGIN_FAIL': error => ({ error })
});

export const userLogin = (username, password, type = '') => dispatch => {
  dispatch(userLoginRequest());
  switch (type) {

    case 'facebook':
      return new Promise((resolve, reject) => {
        return Api.Facebook.login()
          .then((response) => {
            console.log("response:", response);
            const accessToken = _.get(response, 'credentials.token', '');
            return Api.User.facebookLogin(accessToken)
              .then(({data}) => {
                const userId = _.get(data, 'wp_user_id', '');
                Api.User.fetchCustomerById(userId).then((customer) => {
                  const userData = {
                    ...data.user,
                    ...customer,
                    cookie: data.cookie
                  };
                  const metaData = _.get(userData, 'meta_data', []);
                  const userAddress = getMetaData(metaData, 'userAddress', null);
                  const userAddressInfo = JSON.parse(userAddress);
                  dispatch(updateCustomerSuccess(userAddressInfo));
                  dispatch(userLoginSuccess(userData));
                  resolve();
                }).catch(error => dispatch(userLoginFail(handdleErrors(error))));
              })
              .catch(error => {
                dispatch(userLoginFail(handdleErrors(error)));
                reject();
              });
          })
          .catch(error => {
            dispatch(userLoginFail(handdleErrors(error)));
            reject();
          })
      });

    default:
      return new Promise((resolve, reject) => {
        return Api.User.login(username, password).then(({ data }) => {
          Api.User.fetchCustomerById(data.user.id).then((customer) => {
            const userData = {
              ...data.user,
              ...customer,
              cookie: data.cookie
            };
            const metaData = _.get(userData, 'meta_data', []);
            const userAddress = getMetaData(metaData, 'userAddress', null);
            const userAddressInfo = JSON.parse(userAddress);
            dispatch(updateCustomerSuccess(userAddressInfo));
            dispatch(userLoginSuccess(userData));
            resolve();
          }).catch(error => dispatch(userLoginFail(handdleErrors(error))));
        }).catch(error => {
          dispatch(userLoginFail(handdleErrors(error)));
          reject();
        });
      });
  }

};

const { userSignupRequest, userSignupSuccess, userSignupFail } = createActions({
  'USER_SIGNUP_REQUEST': () => {},
  'USER_SIGNUP_SUCCESS': () => {},
  'USER_SIGNUP_FAIL': error => ({ error })
});

export const userSignUp = params => dispatch => {
  dispatch(userSignupRequest());
  return new Promise(async (resolve, reject) => {
    try {
      const nonce = await Api.User.getNonce();
      const userParams = {
        "username": params.email.split("@")[0],
        "email": params.email,
        "display_name": params.name,
        "user_pass": params.password,
        "nonce": _.get(nonce, 'data.nonce', ''),
        "notify": 'both'
      };
      const user = await Api.User.register(userParams);
      const userInfo = await Api.User.fetchUserById(user['data']['user_id']);
      const customer = await Api.User.fetchCustomerById(user['data']['user_id']);
      const userData = {
        ...userInfo.data,
        ...customer,
        cookie: user.data.cookie
      };
      dispatch(userSignupSuccess());
      dispatch(userLoginSuccess(userData));
      resolve(userData);
    } catch (error) {
      const statusError = handdleErrors(error);
      dispatch(userSignupFail(statusError));
      reject(statusError)
    }
  });
};

export const validateLoggedIn = () => (dispatch, getState) => {
  const user = _.get(getState(), 'user.login.result');
  if (user) {
    dispatch(userLoginSuccess(user));
  }
};

const { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail } = createActions({
  'FORGOT_PASSWORD_REQUEST': () => {},
  'FORGOT_PASSWORD_SUCCESS': () => {},
  'FORGOT_PASSWORD_FAIL': error => ({ error })
});

export const forgotPassword = email => dispatch => {
  dispatch(forgotPasswordRequest());
  return new Promise((resolve, reject) => {
    return Api.User.forgotPassword(email).then(({ data }) => {
      dispatch(forgotPasswordSuccess());
      resolve();
    }).catch(error => {
      dispatch(forgotPasswordFail(handdleErrors(error)));
      reject(handdleErrors(error));
    });
  });
};

const { updateCustomerRequest, updateCustomerSuccess, updateCustomerFail } = createActions({
  'UPDATE_CUSTOMER_REQUEST': () => {},
  'UPDATE_CUSTOMER_SUCCESS': (data) => ({ data }),
  'UPDATE_CUSTOMER_FAIL': error => ({ error }),
});

const updateUserInfoTodo = createAction('UPDATE_USER_INFO_TODO');

export const updateCustomerAddress = (data) => (dispatch, getState) => {
  dispatch(updateCustomerSuccess(data));
};

export const updateCustomer = (customerId, params) => (dispatch, getState) => {
  dispatch(updateCustomerRequest());
  return new Promise((resolve, reject) => {
    return Api.User.updateCustomer(customerId, params).then(({ data }) => {
      const address = _.get(getState(), 'user.address.result', []);
      dispatch(updateCustomerSuccess(address));
      // dispatch(updateUserInfoTodo({ data }));
      resolve();
    }).catch(error => {
      dispatch(updateCustomerFail(handdleErrors(error)));
      reject(handdleErrors(error));
    });
  });
};

const { createOrderRequest, createOrderSuccess, createOrderFail } = createActions({
  'CREATE_ORDER_REQUEST': () => {},
  'CREATE_ORDER_SUCCESS': (data) => ({ data }),
  'CREATE_ORDER_FAIL': error => ({ error })
});

export const createOrder = params => dispatch => {
  console.log(params);
  dispatch(createOrderRequest());
  return new Promise((resolve, reject) => {
    return Api.User.createOrder(params).then((data) => {
      dispatch(createOrderSuccess(data));
      resolve(data);
    }).catch(error => {
      dispatch(createOrderFail(handdleErrors(error)));
      reject(handdleErrors(error));
    });
  });
};
const { fetchOrderRequest, fetchOrderSuccess, fetchOrderFail } = createActions({
  'FETCH_ORDER_REQUEST': () => {},
  'FETCH_ORDER_SUCCESS': (data) => ({ data }),
  'FETCH_ORDER_FAIL': error => ({ error })
});

export const fetchOrder = customerId => dispatch => {
  dispatch(fetchOrderRequest());
  return new Promise((resolve, reject) => {
    return Api.User.fetchHistoryOrder(customerId).then((data) => {
      dispatch(fetchOrderSuccess(data));
      resolve();
    }).catch(error => {
      dispatch(fetchOrderFail(handdleErrors(error)));
      reject(handdleErrors(error));
    });
  });
};

const addHistoryOrderTodo = createAction('ADD_HISTORY_ORDER_TODO');
export const addHistoryOrder = (data) => (dispatch) => {
  dispatch(addHistoryOrderTodo({ data }));
};

const { userLogoutRequest, userLogoutSuccess, userLogoutFail } = createActions({
  'USER_LOGOUT_REQUEST': () => { },
  'USER_LOGOUT_SUCCESS': () => { },
  'USER_LOGOUT_FAIL': (error) => ({ error })
});

// @todo Need working on logout features
export const userLogout = () => dispatch => {
  dispatch(userLogoutRequest());
  dispatch(userLogoutSuccess());
};

const { addCardRequest, addCardSuccess, addCardFail } = createActions({
  'ADD_CARD_REQUEST': () => { },
  'ADD_CARD_SUCCESS': (data) => ({ data }),
  'ADD_CARD_FAIL': (error) => ({ error })
});

// @todo Need working on logout features
export const addCard = (cardInfo) => (dispatch, getState) => {
  dispatch(addCardRequest());
  return new Promise(async (resolve, reject) => {
    try {
      let user = _.get(getState(), 'user.login.result', []);
      const { number, exp_month, exp_year, cvc, name, address, city, country, state, postalCode } = cardInfo;
      let customerData = {
        'shipping[name]': name,
        'shipping[address][line1]': address,
        'shipping[address][city]': city,
        'shipping[address][country]': country
      };
      if (state) {
        customerData['shipping[address][state]'] = state;
      }
      if (postalCode) {
        customerData['shipping[address][postal_code]'] = postalCode;
      }
      const metaData = _.get(user, 'meta_data', []);
      let stripeCustomer = getMetaData(metaData, 'stripeCustomer', null);
      stripeCustomer = JSON.parse(stripeCustomer);
      if (stripeCustomer) {
        const customerId = _.get(stripeCustomer, 'id');
        const updateCustomerResponse = await Stripe.updateCustomer(customerId, customerData);
        stripeCustomer = updateCustomerResponse.data;
        //update profile + store
      } else {
        customerData['email'] = _.get(user, 'email', '');
        const customerResponse = await Stripe.createCustomer(customerData);
        stripeCustomer = customerResponse.data;
        //update profile + store
      }
      const cardData = {
        'card[number]': number,
        'card[exp_month]': exp_month,
        'card[exp_year]': exp_year,
        'card[cvc]': cvc
      };
      const cardTokenResponse = await Stripe.createToken(cardData);
      const addCardResponse = await Stripe.addCard(stripeCustomer.id, { source: cardTokenResponse.data.id });
      const stripCardData = addCardResponse.data;
      const params = {
        cookie: _.get(user, 'cookie', ''),
        stripeCustomer: JSON.stringify(stripeCustomer),
        stripeCard: JSON.stringify(stripCardData)
      };
      await Api.User.updateUserMetaData(params);
      const userInfo = await Api.User.fetchUserById(_.get(user, 'id', ''));
      const customer = await Api.User.fetchCustomerById(_.get(user, 'id', ''));
      const userData = {
        ...user,
        ...userInfo.data,
        ...customer
      };
      dispatch(addCardSuccess(userData));
      resolve(userData);
    } catch (error) {
      const statusError = handdleErrors(error);
      dispatch(addCardFail(statusError));
      reject("Add card failed")
    }
  });
};


const { stripeCreateChargeRequest, stripeCreateChargeSuccess, stripeCreateChargeFail } = createActions({
  'STRIPE_CREATE_CHARGE_REQUEST': () => { },
  'STRIPE_CREATE_CHARGE_SUCCESS': (data) => ({ data }),
  'STRIPE_CREATE_CHARGE_FAIL': (error) => ({ error })
});

// @todo Need working on logout features
export const stripeCreateCharge = (amount, customer) => dispatch => {
  dispatch(stripeCreateChargeRequest());
  return new Promise((resolve, reject) => {
    return Api.User.stripeCreateCharge(amount, customer).then(({ data }) => {
      dispatch(stripeCreateChargeSuccess(data));
      resolve();
    }).catch(error => {
      dispatch(stripeCreateChargeFail(handdleErrors(error)));
      reject(handdleErrors(error));
    });
  });
};

const { stripeDeleteCardRequest, stripeDeleteCardSuccess, stripeDeleteCardFail } = createActions({
  'STRIPE_DELETE_CARD_REQUEST': () => { },
  'STRIPE_DELETE_CARD_SUCCESS': (data) => ({ data }),
  'STRIPE_DELETE_CARD_FAIL': (error) => ({ error })
});

// @todo Need working on logout features
export const stripeDeleteCard = (stripeCustomerId, stripeCardId) => (dispatch, getState) => {
  dispatch(stripeDeleteCardRequest());
  return new Promise((resolve, reject) => {
    return Api.User.stripeDeleteCard(stripeCustomerId, stripeCardId).then(async () => {
      let user = _.get(getState(), 'user.login.result', []);
      const params = {
        stripeCard: '',
        cookie: _.get(user, 'cookie', ''),
      };
      await Api.User.updateUserMetaData(params);
      const userInfo = await Api.User.fetchUserById(_.get(user, 'id', ''));
      const customer = await Api.User.fetchCustomerById(_.get(user, 'id', ''));
      const userData = {
        ...user,
        ...userInfo.data,
        ...customer
      };
      dispatch(stripeDeleteCardSuccess(userData));
    }).catch(error => {
      dispatch(stripeDeleteCardFail(handdleErrors(error)));
      reject('Delete card failed');
    });
  });
};

const { updateUserMetaDataRequest, updateUserMetaDataSuccess, updateUserMetaDataFail } = createActions({
  'UPDATE_USER_META_DATA_REQUEST': () => { },
  'UPDATE_USER_META_DATA_SUCCESS': () => { },
  'UPDATE_USER_META_DATA_FAIL': (error) => ({ error })
});

export const updateUserMetaData = (userMetas) => (dispatch, getState) => {
  dispatch(updateUserMetaDataRequest());
  let user = _.get(getState(), 'user.login.result', []);
  const params = {
    ...userMetas,
    cookie: _.get(user, 'cookie', '')
  };
  return Api.User.updateUserMetaData(params)
    .then(() => {
      dispatch(updateUserMetaDataSuccess());
    }).catch(error => {
      dispatch(updateUserMetaDataFail(error));
    })
};