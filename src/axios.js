import axios from "axios";
import { configData } from "./slices/config";

const CONFIG = configData[process.env.REACT_APP_NODE_ENV];
const UNAUTHORIZED = 401;

/* istanbul ignore next */
export function axiosInterceptor() {
  axios.interceptors.request.use(
    config => {
      config.headers["Accept"] = "application/json";
      config.headers["Authorization"] = sessionStorage.getItem(CONFIG.HEDWIG_TOKEN);
      config.baseURL = CONFIG.SERVER_URL;
      return config;
    },
    error => {
      Promise.reject(error);
    });

  axios.interceptors.response.use(
    response => response,
    error => {
      const { status } = error.response;
      if (status === UNAUTHORIZED) {
        sessionStorage.removeItem(CONFIG.HEDWIG_TOKEN);
      }
      return Promise.reject(error);
    }
  );
}