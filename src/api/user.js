import http from '../services/http';
import WooWorker from '../services/wooWorker';
import Stripe from '../services/stripe';

export default class User {
  static login(username, password) {
    const params = {
      username,
      password,
      seconds: 30 * 24 * 60 * 60,
      insecure: 'cool'
    };
    return http.get(`/api/user/generate_auth_cookie`, { params });
  }
  static getNonce() {
    const params = {
      controller: 'user',
      method: 'register'
    };
    return http.get(`/api/get_nonce`, { params });
  }
  static register(userParams) {
    const params = {
      ...userParams,
      insecure: 'cool'
    };
    return http.get(`/api/user/register`, { params });
  }
  static updateUserMetaData(userParams) {
    const params = {
      ...userParams,
      insecure: 'cool'
    };
    return http.get(`/api/user/update_user_meta_vars`, { params });
  }

  static fetchUserById (id) {
    const params = {
      "user_id": id,
      "insecure": 'cool'
    };
    return http.get('/api/user/get_userinfo', { params });
  }
  static fetchCustomerById (id) {
    return new Promise((resolve, reject) => {
      WooWorker.API.get(`customers/${id}`)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static forgotPassword (email) {
    const params = {
      "user_login": email,
      "insecure": 'cool'
    };
    return http.get('/api/user/retrieve_password', { params });
  }
  static fetchAllOrder (customerId) {
    const params = {
      customer: customerId,
      orderby: 'date'
    };
    return new Promise((resolve, reject) => {
      WooWorker.API.get(`customers`, params)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static updateCustomer (customerId, params) {
    return new Promise((resolve, reject) => {
      WooWorker.API_WP.put(`customers/${customerId}`, params)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static createOrder(params) {
    return new Promise((resolve, reject) => {
      WooWorker.API.post(`orders`, params)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static fetchHistoryOrder(customerId) {
    return new Promise((resolve, reject) => {
      const params = {
        customer: customerId
      };
      WooWorker.API.get(`orders`, params)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static stripeCreateCharge(amount, customer) {
    const params = {
      amount: amount * 100,
      customer,
      currency: 'usd'
    };
    return Stripe.createCharge(params);
  }

  static stripeDeleteCard(stripeCustomerId, stripeCardId) {
    return Stripe.deleteCard(stripeCustomerId, stripeCardId);
  }

  static facebookLogin(accessToken) {
    const params = {
      access_token: accessToken,
      insecure: 'cool'
    };
    return http.get(`/api/user/fb_connect`, { params });
  }
}