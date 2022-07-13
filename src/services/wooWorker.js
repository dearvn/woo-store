import WooCommerceAPI from './WooCommerceAPI';

const appConfig = require('../../app.json');

const API = new WooCommerceAPI({
  url: appConfig.baseUrl,
  consumerKey: appConfig.consumerKey,
  consumerSecret: appConfig.consumerSecret,
  wp_api: true,
  version: 'wc/v2',
});

const API_WP = new WooCommerceAPI({
  url: appConfig.baseUrl,
  consumerKey: appConfig.consumerKey,
  consumerSecret: appConfig.consumerSecret,
  wp_api: true,
  version: 'wp/v2',
});

const WooWorker = { API, API_WP };

export default WooWorker;
