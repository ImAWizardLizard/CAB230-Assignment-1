// import getSession from "./helpers";
import axios from "axios";
import { getSession } from "./helpers";
import qs from "qs";
const API_ENDPOINT = "http://131.181.190.87:3000";

const getData = (endpoint, data) => {
  return axios.get(`${API_ENDPOINT}${endpoint}`, data).then(
    (res) => res,
    (error) => error.response
  );
};

const postData = (endpoint, params) => {
  return axios.post(`${API_ENDPOINT}${endpoint}`, params).then(
    (res) => res,
    (error) => error.response
  );
};

export const getStocks = (industry) => {
  return getData("/stocks/symbols", industry ? { params: { industry } } : {});
};

export const getStock = (stock) => {
  return getData(`/stocks/${stock}`);
};

export const getDateStock = (stock, date_from, date_to) => {
  let token = getSession();
  return getData(`/stocks/authed/${stock}`, {
    params:
      date_from || date_to
        ? {
            from: date_from || "",
            to: date_to || "",
          }
        : {},
    headers: { Authorization: `Bearer ${token}` },
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  });
};

export const registerUser = (email, password) => {
  let data = { email, password };
  return postData("/user/register", data);
};

export const loginUser = (email, password) => {
  let data = { email, password };
  return postData("/user/login", data);
};
