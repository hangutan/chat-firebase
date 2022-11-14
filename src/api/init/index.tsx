import axios from "../configApi";

export const initApp = async (data: any) => {
  try {
    const res = await axios.post(`application/initial`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
