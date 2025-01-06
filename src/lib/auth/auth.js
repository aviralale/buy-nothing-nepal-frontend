import axios from "axios";
import { authUrl, baseURL } from "../apiUrl";

export const register = async (user) => {
  try {
    const response = await axios.post(`${authUrl}/users/`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexcepted error occurred. Please try again later.");
    }
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${authUrl}/jwt/create/`, user);
    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      return true;
    }
  } catch (error) {
    throw error.response ? error.response.data : { detail: error.detail };
  }
  return false;
};

export const logout = (callback) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  if (typeof callback === "function") {
    callback();
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem("access_token") !== null;
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${authUrl}/jwt/refresh/`, {
      refresh: localStorage.getItem("refresh_token"),
    });
    localStorage.setItem("access_token", response.data.access);
    return true;
  } catch (error) {
    return false;
  }
};

export const getTokens = () => {
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
  };
};

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

axiosInstance.interceptors.response.use(
  (config) => {
    const token = getTokens();
    if (token.access) {
      config.headers["Authorization"] = `Bearer ${token.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/users/me/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
