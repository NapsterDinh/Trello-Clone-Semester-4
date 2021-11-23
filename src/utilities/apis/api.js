import axios from "axios";
import configuration from "./configuration";

const { ApiUrl } = configuration;

const instance = axios.create({
  baseURL: ApiUrl,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    // "content-type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  function (config) {
    // console.log('from api.js', config.url);
    console.log("API::REQUEST", config);
    const { ApiRequestToken } = configuration;

    console.log("ApiRequestToken", ApiRequestToken);
    if (ApiRequestToken) {
      config.headers.Authorization = `${ApiRequestToken}`;
      return config;
    }
    return config;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const _post = (action, data) => {
  return instance.post(action, data);
};

export const _get = (action, params) => {
  return instance.get(`${action}`, { params });
};

export const _put = (action, params) => {
  return instance.put(`${action}`, params);
};

export const _patch = (action, params) => {
  return instance.patch(`${action}`, params);
};

export const _delete = (action, params) => {
  return instance.delete(`${action}`, { params });
};

export const _getWithToken = (action, token) => {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance.get(`${action}`, token);
};
