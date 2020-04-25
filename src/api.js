// import getSession from "./helpers";
import axios from "axios";
import { getSession } from "./helpers";
import qs from "qs";
const API_ENDPOINT = "http://131.181.190.87:3000";

export const getStocks = (industry) => {
  return axios
    .get(
      `${API_ENDPOINT}/stocks/symbols`,
      industry ? { params: { industry } } : {}
    )
    .then(
      (res) => res.data,
      (error) => console.log(error)
    );
};

export const getStock = (stock) => {
  return axios.get(`${API_ENDPOINT}/stocks/${stock}`).then(
    (res) => res.data,
    (error) => console.log(error)
  );
};

export const getDateStock = (stock, date_from, date_to) => {
  let token = getSession();
  return axios
    .get(`${API_ENDPOINT}/stocks/authed/${stock}`, {
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
    })
    .then(
      (res) => res.data,
      (error) => console.log(error)
    );
};

export const registerUser = (email, password) => {
  let postData = { email, password };
  return axios.post(`${API_ENDPOINT}/user/register`, postData).then(
    (res) => res,
    (error) => error.response
  );
};

export const loginUser = (email, password) => {
  let postData = { email, password };
  return axios.post(`${API_ENDPOINT}/user/login`, postData).then(
    (res) => res,
    (error) => error.response
  );
};
