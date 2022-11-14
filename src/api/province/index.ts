import axios from "../configApi";

export const getProvince = async () => {
  try {
    const res = await axios.get(`address/province`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDistrict = async code => {
  try {
    const res = await axios.get(`address/district/${code}`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWard = async code => {
  try {
    const res = await axios.get(`address/ward/${code}`, {});
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};