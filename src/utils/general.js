import _ from 'lodash';

export function getProducFromCategories(data, categoryId, productId) {
  const productData = _.find(data, (item) => item.categoryId === categoryId);
  const products = _.get(productData, 'data', []);
  return _.find(products, (item) => item.id === productId);
}

export function getMetaData(items, key, defaultValue = '') {
  for(let i = 0; i < items.length; i++) {
    if (items[i].key === key) {
      return items[i].value ? items[i].value : defaultValue;
    }
  }
  return defaultValue;
}

export function handdleErrors(error) {
  if (error.response) {
    return {
      status: error.response.status,
      headers: error.response.headers,
      data: error.response.data,
    };
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
}

const appConfig = require('../../app.json');
export const VERSION = appConfig.version;