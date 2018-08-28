import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import Promise from 'bluebird';

import HttpError from '../helpers/HttpError';

export default class ApiClient {
  constructor({ prefix }) {
    this.prefix = prefix;
  }

  get(requestUrl, payload = {}, params = {}) {
    return this.request({
      url: requestUrl,
      method: 'get',
      body: payload,
      params
    });
  }

  put(requestUrl, payload = {}, params = {}) {
    return this.request({
      url: requestUrl,
      method: 'put',
      body: payload,
      params
    });
  }

  patch(requestUrl, payload = {}, params = {}) {
    return this.request({
      url: requestUrl,
      method: 'PATCH',
      body: payload,
      params
    });
  }

  post(requestUrl, payload = {}, params = {}) {
    return this.request({
      url: requestUrl,
      method: 'post',
      body: payload,
      params
    });
  }

  delete(requestUrl, payload = {}, params = {}) {
    return this.request({
      url: requestUrl,
      method: 'delete',
      body: payload,
      params
    });
  }

  request({
    url, method, params = {}, body
  }) {
    let urlWithQuery = url;
    if (Object.keys(params).length > 0) {
      urlWithQuery = urlWithQuery.concat(`?${queryString.stringify(params)}`);
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (this.authToken) {
      headers.authorization = `JWT ${this.authToken}`;
    }
    const init = {
      method,
      headers,
      redirect: 'follow'
    };

    if (method !== 'get' && method !== 'head') {
      init.body = JSON.stringify(body);
    }

    return fetch(`${urlWithQuery}`, init).then((response) => {
      if (response.redirected) {
        return response.json().then((res) => {
          response.customBody = res;
          throw new HttpError(response);
        });
      }
      if (response.status === 200) {
        return response.json();
      }
      return response.json().then((res) => {
        response.customBody = res;
        throw new HttpError(response);
      });
    }).then((data) => {
      if (data.errors) {
        return Promise.reject(data.errors);
      }
      return data;
    });
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }
}
