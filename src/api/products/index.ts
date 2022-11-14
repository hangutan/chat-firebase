import axios from "../configApi";

export const getCategoryProduct = async () => {
  try {
    const res = await axios.get(`product/category`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getBrandProduct = async (data: any) => {
  try {
    const res = await axios.post(`product/brand`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const findProduct = async data => {
  try {
    const res = await axios.post(`product/list`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getShopPos = async data => {
  try {
    const res = await axios.post(`shop/poss`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getSupplyByPos = async code => {
  try {
    const res = await axios.get(`shop/supplier-by-pos/${code}`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getSchemeByPos = async code => {
  try {
    const res = await axios.get(`shop/scheme-by-pos/${code}`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}