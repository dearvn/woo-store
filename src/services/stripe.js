import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';

const appConfig = require('../../app.json');

const requestOptions = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  auth: {
    username: appConfig.stripeSecretKey,
    password: ''
  }
};

module.exports = {
  createToken: function (card) {
    return axios.post('https://api.stripe.com/v1/tokens', qs.stringify(card), requestOptions);
  },
  createCustomer: function (customer) {
    return axios.post('https://api.stripe.com/v1/customers', qs.stringify(customer), requestOptions);
  },
  updateCustomer: function (customerId, data) {
    return axios.post(`https://api.stripe.com/v1/customers/${customerId}`, qs.stringify(data), requestOptions);
  },
  createCharge: function (data) {
    return axios.post(`https://api.stripe.com/v1/charges`, qs.stringify(data), requestOptions);
  },
  refund: function (chargeId) {
    return axios.post(`https://api.stripe.com/v1/refunds`, qs.stringify({ charge: chargeId, reverse_transfer: true }), requestOptions);
  },
  createOrder: function (order) {
    return axios.post('https://api.stripe.com/v1/orders', qs.stringify(order), requestOptions);
  },
  payOrder: function (orderId, customer) {
    return axios.post(`https://api.stripe.com/v1/orders/${orderId}/pay`, qs.stringify(customer), requestOptions);
  },
  createSKU: function (sku) {
    return axios.post('https://api.stripe.com/v1/skus', qs.stringify(sku), requestOptions);
  },
  updateSKU: function (skuId, data) {
    return axios.post(`https://api.stripe.com/v1/skus/${skuId}`, qs.stringify(data), requestOptions);
  },
  createProduct: function (product) {
    return axios.post('https://api.stripe.com/v1/products', qs.stringify(product), requestOptions);
  },
  addCard: function (customerId, cardToken) {
    return axios.post(`https://api.stripe.com/v1/customers/${customerId}/sources`, qs.stringify(cardToken), requestOptions);
  },
  deleteCard: function (customerId, cardId) {
    return axios.delete(`https://api.stripe.com/v1/customers/${customerId}/sources/${cardId}`, requestOptions);
  },
  createAccount: function (account) {
    return axios.post('https://api.stripe.com/v1/accounts', qs.stringify(account), requestOptions);
  },
  updateAccount: function (id, params) {
    return axios.post(`https://api.stripe.com/v1/accounts/${id}`, qs.stringify(params), requestOptions);
  },
  getCountrySpecs: function (country) {
    return axios.get(`https://api.stripe.com/v1/country_specs/${country}`, requestOptions);
  },
  getBalanceInfo: function (balanceId) {
    return axios.get(`https://api.stripe.com/v1/balance/history/${balanceId}`, requestOptions);
  },
  getBalance: function (accountId) {
    let newRequestOptions = _.cloneDeep(requestOptions);
    _.set(newRequestOptions, 'headers[Stripe-Account]', accountId);
    return axios.get(`https://api.stripe.com/v1/balance`, newRequestOptions);
  },
  getCharge: function (chargeId) {
    return axios.get(`https://api.stripe.com/v1/charges/${chargeId}`, requestOptions);
  },
  sendPayout: function (accountId, amount, currency) {
    // Destination account id
    let newRequestOptions = _.cloneDeep(requestOptions);
    _.set(newRequestOptions, 'headers[Stripe-Account]', accountId);
    const params = {
      amount: amount,
      currency: currency
    };
    return axios.post(`https://api.stripe.com/v1/payouts`, qs.stringify(params), newRequestOptions);
  },
  deleteAccount: function (id) {
    return axios.delete(`https://api.stripe.com/v1/accounts/${id}`, requestOptions);
  }
};
