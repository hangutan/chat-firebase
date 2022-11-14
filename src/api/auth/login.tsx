import axios from "../configApi";

export const login = async data => {
  try {
    const res = await axios.post(`users/login`, data);
    console.log(res);
    // res.data && setToken(res.data.token);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const verifyAccessToken = async data => {
//   try {
//     const res = await axios.post(`/auth/verify-access-token`, data);
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
