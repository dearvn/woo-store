import _ from 'lodash';
import WooWorker from "../services/wooWorker";

export default class Woo {
  static fetchAllProduct(params) {
    return new Promise((resolve, reject) => {
      WooWorker.API.get('products', params)
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
  
  static fetchReviewByProductId(id) {
    return new Promise((resolve, reject) => {
      WooWorker.API.get(`products/${id}/reviews`, {})
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

  static fetchProductById(id) {
    return new Promise((resolve, reject) => {
      WooWorker.API.get(`products/${id}`)
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

  static fetchCategories(params) {
    return new Promise((resolve, reject) => {
      WooWorker.API.get('products/categories', params)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            let rootCategories = _.filter(data, (item) => item.parent === 0);
            const childCategories = _.filter(data, (item) => item.parent !== 0);
            _.forEach(childCategories, (item) => {
              _.forEach(rootCategories, (category) => {
                if (item.parent === category.id) {
                  category.child = category.child ? [...category.child, item] : [item];
                  return false;
                }
              });
            });
            resolve(rootCategories);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static fetchProductByCategories(id) {
    return new Promise((resolve, reject) => {
      WooWorker.API.get('products/categories', params)
        .then(response => response.text())
        .then(responseData => {
          const data = JSON.parse(responseData);
          if (data.code) {
            reject(data);
          } else {
            let rootCategories = _.filter(data, (item) => item.parent === 0);
            const childCategories = _.filter(data, (item) => item.parent !== 0);
            _.forEach(childCategories, (item) => {
              _.forEach(rootCategories, (category) => {
                if (item.parent === category.id) {
                  category.child = category.child ? [...category.child, item] : [item];
                  return false;
                }
              });
            });
            resolve(rootCategories);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static createOrder(params) {
    return new Promise((resolve, reject) => {
      WooWorker.API.post('orders', params)
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

  static getCoupons() {
    return new Promise((resolve, reject) => {
      WooWorker.API.get('coupons')
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

  static getShippingMethod() {
    return new Promise((resolve, reject) => {
      WooWorker.API.get('shipping/zones/1/methods')
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

}