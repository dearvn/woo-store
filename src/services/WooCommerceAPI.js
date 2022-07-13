/*
 * WooCommerce API
 * DO NOT TOUCH!
 */
'use strict';

import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

export default WooCommerceAPI;

function WooCommerceAPI(opt) {
  if (!(this instanceof WooCommerceAPI)) {
    return new WooCommerceAPI(opt);
  }

  opt = opt || {};

  if (!(opt.url)) {
    throw new Error('url is required');
  }
  if (!(opt.consumerKey)) {
    throw new Error('consumerKey is required');
  }
  if (!(opt.consumerSecret)) {
    throw new Error('consumerSecret is required');
  }

  // this.classVersion = '1.0.0';
  this._setDefaultsOptions(opt);
}

WooCommerceAPI.prototype._setDefaultsOptions = function (opt) {
  this.url = opt.url;
  this.wpAPI = opt.wpAPI || false;
  this.wpAPIPrefix = opt.wpAPIPrefix || 'wp-json';
  this.version = opt.version || 'v3';
  this.isSsl = /^https/i.test(this.url);
  this.consumerKey = opt.consumerKey;
  this.consumerSecret = opt.consumerSecret;
  this.verifySsl = opt.verifySsl;
  this.encoding = opt.encoding || 'utf8';
  this.queryStringAuth = opt.queryStringAuth || true;
  this.port = opt.port || '';
  this.timeout = opt.timeout || 10;
};

WooCommerceAPI.prototype._normalizeQueryString = function (url) {
  // Exit if don't find query string
  if (-1 === url.indexOf('?')) return url;

  // let query       = _url.parse(url, true).query;
  let query = url;
  let params = [];
  let queryString = '';

  for (let p in query) params.push(p);
  params.sort();

  for (let i in params) {
    if (queryString.length) queryString += '&';

    queryString += encodeURIComponent(params[i]).replace('%5B', '[').replace('%5D', ']');
    queryString += '=';
    queryString += encodeURIComponent(query[params[i]]);
  }

  return url.split('?')[0] + '?' + queryString;
};

WooCommerceAPI.prototype._getUrl = function (endpoint) {
  let url = '/' === this.url.slice(-1) ? this.url : this.url + '/';
  let api = this.wpAPI ? this.wpAPIPrefix + '/' : 'wp-json/';

  url = url + api + this.version + '/' + endpoint;

  // Include port.
  if ('' !== this.port) {
    let hostname = url; //_url.parse(url, true).hostname;
    url = url.replace(hostname, hostname + ':' + this.port);
  }

  if (!this.isSsl)
    return this._normalizeQueryString(url);

  return url;
};

WooCommerceAPI.prototype._getOAuth = function () {
  let data = {
    consumer: {
      key: this.consumerKey,
      secret: this.consumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
  };

  if (-1 < ['v1', 'v2'].indexOf(this.version)) data.last_ampersand = false;
  return new OAuth(data);
};

WooCommerceAPI.prototype.join = function (obj, separator) {
  let arr = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(key + '=' + obj[key]);
    }
  }
  return arr.join(separator);
};

WooCommerceAPI.prototype._request = function (method, endpoint, data) {

  let url = this._getUrl(endpoint);

  let params = {
    url: url,
    method: method,
    encoding: this.encoding,
    timeout: this.timeout,
  };

  if (this.isSsl) {
    if (this.queryStringAuth) {
      params.qs = {
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret
      };
    } else {
      params.auth = {
        user: this.consumerKey,
        pass: this.consumerSecret
      };
    }
    params.strictSSL = this.verifySsl;
  } else {
    if (method === 'GET') {
      params.qs = this._getOAuth().authorize({
        url: url,
        method: method,
        data: data
      });
    } else if (method === 'POST') {
      params.qs = this._getOAuth().authorize({
        url: url,
        method: method,
      });
    }
  }
  // encode the oauth_signature to make sure it not remove + charactor
  params.qs.oauth_signature = encodeURIComponent(params.qs.oauth_signature);
  params.url = params.url + '?' + this.join(params.qs, '&');

  if (method === 'GET') {
    params.headers = { 'Cache-Control': 'no-cache' };
  } else if (method === 'POST') {
    params.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    params.body = JSON.stringify(data);
  }

  return fetch(params.url, params);
};

WooCommerceAPI.prototype.get = function (endpoint, data) {
  return this._request('GET', endpoint, data);
};

WooCommerceAPI.prototype.post = function (endpoint, data) {
  return this._request('POST', endpoint, data);
};

WooCommerceAPI.prototype.put = function (endpoint, data) {
  return this._request('PUT', endpoint, data);
};

WooCommerceAPI.prototype.delete = function (endpoint) {
  return this._request('DELETE', endpoint, null);
};

WooCommerceAPI.prototype.options = function (endpoint) {
  return this._request('OPTIONS', endpoint, null);
};
