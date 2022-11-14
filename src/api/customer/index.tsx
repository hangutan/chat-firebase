import axios from "../configApi";

export const ocrCardId = async (formData: any) => {
  try {
    const res = await axios.post(`address/ocr-customer`, { formData });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getInformation = async () => {
  try {
    const res = await axios.get(`users/get-one`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateInformation = async () => {
  try {
    const res = await axios.post("users/", {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCustomerOverral = async (data: any) => {
  try {
    const res = await axios.put("application/customer-overral", data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCustomerRefference = async (data: any) => {
  try {
    const res = await axios.put(`application/customer-reference`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkCustomer = async (data: any) => {
  try {
    const res = await axios.post(`application/check-customer`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
