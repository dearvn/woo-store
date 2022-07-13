import _ from 'lodash';
import { createActions } from 'redux-actions';
import Api from '../api';

const { fetchAllProductRequest, fetchAllProductSuccess, fetchAllProductFailure } = createActions({
  'FETCH_ALL_PRODUCT_REQUEST': () => {},
  'FETCH_ALL_PRODUCT_SUCCESS': (data, page, canLoadMore) => ({ data, page, canLoadMore }),
  'FETCH_ALL_PRODUCT_FAILURE': error => ({ error })
});

export const fetchAllProduct = (search = '', page = 1, perPage = 10) => (dispatch, getState) => {
  dispatch(fetchAllProductRequest());
  let data = {
    search,
    per_page: perPage,
    page,
    order: "desc",
    orderby: "date",
  };
  return Api.Woo.fetchAllProduct(data)
    .then(response => {
      let fetchAllProduct = getState().product.fetchAllProduct;
      let products = fetchAllProduct.result;
      if (page === 1) {
        products = response;
      } else {
        products = _.concat(products, response);
      }
      const canLoadMore = (_.size(response) === perPage);
      dispatch(fetchAllProductSuccess(products, page, canLoadMore));
    })
    .catch(err => {
      dispatch(fetchAllProductFailure(err));
    });
};

const { fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesFailure } = createActions({
  'FETCH_CATEGORIES_REQUEST': () => {},
  'FETCH_CATEGORIES_SUCCESS': data => ({ data }),
  'FETCH_CATEGORIES_FAILURE': error => ({ error })
});

export const fetchCategories = () => dispatch => {
  dispatch(fetchCategoriesRequest());
  let params = {
    hide_empty: true,
    per_page: 100,
    order: 'desc',
    orderby: 'count'
  };
  return Api.Woo.fetchCategories(params)
    .then(response => {
      dispatch(fetchCategoriesSuccess(response));
    })
    .catch(err => {
      dispatch(fetchCategoriesFailure(err));
    });
};

const { fetchProductByCategoriesRequest, fetchProductByCategoriesSuccess, fetchProductByCategoriesFailure } = createActions({
  'FETCH_PRODUCT_BY_CATEGORIES_REQUEST': () => {},
  'FETCH_PRODUCT_BY_CATEGORIES_SUCCESS': (data) => ({ data }),
  'FETCH_PRODUCT_BY_CATEGORIES_FAILURE': error => ({ error })
});

export const fetchProductByCategory = (categoryId, page = 1, per_page = 6, search = '') => (dispatch, getState) => {
  dispatch(fetchProductByCategoriesRequest());
  let data = {
    category: categoryId,
    per_page,
    page,
    order: "desc",
    orderby: "date",
    search
  };
  return Api.Woo.fetchAllProduct(data)
    .then(response => {

      const data = response;
      const perPage = per_page;
      const allProducts = getState().product.productByCategories.result;
      const currentProducts = _.find(allProducts, (item) => item.categoryId === categoryId);
      const productByCategory = _.get(currentProducts, 'data', []);
      const products = {
        categoryId,
        data: page > 1 ? [...productByCategory, ...data] : data,
        page,
        canLoadMore: (_.size(data) === perPage)
      };
      let newResult = _.filter(allProducts, (item) => item.categoryId !== categoryId);
      newResult = _.concat(newResult, products);
      dispatch(fetchProductByCategoriesSuccess(newResult));
    })
    .catch(err => {
      dispatch(fetchProductByCategoriesFailure(err));
    });
};

export const fetchProductById = (productId, categoryId) => (dispatch, getState) => {
  dispatch(fetchProductByCategoriesRequest());
  return Api.Woo.fetchProductById(productId)
    .then(response => {
      const data = response;
      const allProducts = getState().product.productByCategories.result;
      const currentProducts = _.find(allProducts, (item) => item.categoryId === categoryId);
      const productByCategory = _.get(currentProducts, 'data', []);
      let products = {};
      if (!!productByCategory.length) {
        products = _.clone(productByCategory);
        products.data = _.concat(productByCategory.data, data);
      } else {
        products = {
          categoryId,
          data: [data],
          page: 0,
          canLoadMore: true
        }
      }
      let newResult = _.filter(allProducts, (item) => item.categoryId !== categoryId);
      newResult = _.concat(newResult, products);
      dispatch(fetchProductByCategoriesSuccess(newResult));
    })
    .catch(err => {
      dispatch(fetchProductByCategoriesFailure(err));
    });
};


export const fetchReviewByProductId = (productId, categoryId) => (dispatch, getState) => {
  dispatch(fetchProductByCategoriesRequest());
  return Api.Woo.fetchReviewByProductId(productId)
    .then(response => {
      if (!response || !response.length) {
        return dispatch(fetchProductByCategoriesFailure({ message: `Don't have reviews` }));
      }
      const allProducts = getState().product.productByCategories.result;
      const currentCategories = _.find(allProducts, (item) => item.categoryId === categoryId);
      let productByCategory = _.get(currentCategories, 'data', []);
      let products = {};
      if (!!productByCategory.length) {
        products = _.clone(productByCategory);
        let product = _.find(products, (product) => product.id === productId);
        _.set(product, 'reviews', response);
        productByCategory.data.map(item => {
          if (item.id === productId) {
            return product;
          } else {
            return item;
          }
        });
        products.data = productByCategory.data;
      }
      let newResult = _.filter(allProducts, (item) => item.categoryId !== categoryId);
      newResult = _.concat(newResult, products);
      dispatch(fetchProductByCategoriesSuccess(newResult));
    })
    .catch(err => {
      dispatch(fetchProductByCategoriesFailure(err));
    });
}

const { fetchCouponsRequest, fetchCouponsSuccess, fetchCouponsFailure } = createActions({
  'FETCH_COUPONS_REQUEST': () => {},
  'FETCH_COUPONS_SUCCESS': data => ({ data }),
  'FETCH_COUPONS_FAILURE': error => ({ error })
});

export const fetchCoupons = () => (dispatch, getState) => {
  dispatch(fetchCouponsRequest());
  return Api.Woo.getCoupons()
    .then(data => {
      dispatch(fetchCouponsSuccess(data));
    })
    .catch(err => {
      dispatch(fetchCouponsFailure(err));
    });
};

const { fetchShippingMethodRequest, fetchShippingMethodSuccess, fetchShippingMethodFailure } = createActions({
  'FETCH_SHIPPING_METHOD_REQUEST': () => {},
  'FETCH_SHIPPING_METHOD_SUCCESS': data => ({ data }),
  'FETCH_SHIPPING_METHOD_FAILURE': error => ({ error })
});

export const fetchShippingMethod = () => (dispatch, getState) => {
  dispatch(fetchShippingMethodRequest());
  return Api.Woo.getShippingMethod()
    .then(response => {
      const data = response.map(item => {
        const id = _.get(item, 'id', '');
        const methodId = _.get(item, 'method_id', '');
        const title = _.get(item, 'method_title', '');
        const total = _.get(item, 'settings.cost.value', 0);
        return {
          "method_id": `${methodId}:${id}`,
          "method_title": title,
          "total": total
        }
      });
      dispatch(fetchShippingMethodSuccess(data));
    })
    .catch(err => {
      dispatch(fetchShippingMethodFailure(err));
    });
};

const { fetchAllOfferProductRequest, fetchAllOfferProductSuccess, fetchAllOfferProductFailure } = createActions({
  'FETCH_ALL_OFFER_PRODUCT_REQUEST': () => {},
  'FETCH_ALL_OFFER_PRODUCT_SUCCESS': (data, page, canLoadMore) => ({ data, page, canLoadMore }),
  'FETCH_ALL_OFFER_PRODUCT_FAILURE': error => ({ error })
});

export const fetchAllOfferProduct = (search = '', page = 1, perPage = 10) => (dispatch, getState) => {
  dispatch(fetchAllOfferProductRequest());
  let data = {
    search,
    per_page: perPage,
    page,
    on_sale: true,
    order: "desc",
    orderby: "date",
  };
  return Api.Woo.fetchAllProduct(data)
    .then(response => {
      let fetchAllOfferProduct = getState().product.fetchAllOfferProduct;
      let products = fetchAllOfferProduct.result;
      if (page === 1) {
        products = response;
      } else {
        products = _.concat(products, response);
      }
      const canLoadMore = (_.size(response) === perPage);
      dispatch(fetchAllOfferProductSuccess(products, page, canLoadMore));
    })
    .catch(err => {
      dispatch(fetchAllOfferProductFailure(err));
    });
};