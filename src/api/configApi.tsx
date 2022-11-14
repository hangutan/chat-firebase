import axios, { Method } from "axios";

const defaults = {
  baseURL: `${process.env.REACT_APP_DOMAIN_API}`,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
    // Authorization: `Bearer ${token}`,
  },
  error: {
    code: "INTERNAL_ERROR",
    message: "Có lỗi xảy ra, vui lòng thử lại sau ít phút !",
    status: 503,
    data: {}
  }
};

interface Params {
  formData?: object;
  [key: string]: any;
}

interface Options {
  isOriginalUrl?: boolean;
}

const axiosClient = async (
  method: string,
  url: string,
  params?: Params,
  options: Options = {
    isOriginalUrl: false
  }
) => {
  let headers = defaults.headers;
  const { ...restParams } = params;
  let variables = restParams;
  if (variables && variables.formData) {
    variables = variables.formData;
    headers["Content-Type"] = "multipart/form-data; charset=utf-8";
  } else {
    headers["Content-Type"] = "application/json; charset=utf-8";
  }

  return axios({
    url: options.isOriginalUrl ? url : defaults.baseURL + url,
    method: method as Method,
    headers,
    params: method === "get" ? variables : undefined,
    data: method !== "get" ? variables : undefined
  })
    .then(res => {
      const data = res || {};
      return data;
    })
    .catch(error => {
      const data = error || {};
      return data;
    });
};

export default {
  get: (url: string, params: Params, options?: Options) =>
    axiosClient("get", url, params, options),
  post: (url: string, params: Params, options?: Options) =>
    axiosClient("post", url, params, options),
  put: (url: string, params: Params, options?: Options) =>
    axiosClient("put", url, params, options),
  patch: (url: string, params: Params, options?: Options) =>
    axiosClient("patch", url, params, options),
  delete: (url: string, params: Params, options?: Options) =>
    axiosClient("delete", url, params, options)
};
