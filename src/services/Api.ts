import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { enqueueSnackbar } from "notistack";
import AuthService from "./AuthService";

export const SITE_URL = "https://localhost:8080/api/";
axios.defaults.baseURL = SITE_URL;

const api = axios.create({
  baseURL: SITE_URL,
});

export const SUCCESS_KEYS = [200, 201, 204];

// Request interceptor to apply auth
api.interceptors.request.use((config: any) => {
  const token = AuthService.getAccessToken();
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config;
});

const callApi = (
  url: string,
  method: Method,
  params?: any,
  config?: AxiosRequestConfig
) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    api[method](url, params, config)
      .then((response: AxiosResponse) => {
        if (SUCCESS_KEYS.includes(response?.request?.status)) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const checkOnUndefinedParameters = (
  args: any,
  url: string,
  method: Method,
  data?: any,
  config?: any
  // eslint-disable-next-line consistent-return
) => {
  const hasUndefined = args.some((arg: any) => typeof arg === "undefined");
  if (!hasUndefined) {
    return callApi(url, method, data, config);
  }
  enqueueSnackbar("Undefined Parameter Error", {
    variant: "error",
    style: { marginBottom: "20px" },
  });
};

// API Endpoints

export const getLinks = () => checkOnUndefinedParameters([], "links", "get");
