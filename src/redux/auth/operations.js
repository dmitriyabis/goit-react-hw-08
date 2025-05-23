import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetContacts } from "../contacts/slice"; //

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token);

      // Optional: persist token manually if needed
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);

      // Optional: persist token manually if not using redux-persist
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();

    // Clear token from localStorage
    localStorage.removeItem("token");

    thunkAPI.dispatch(resetContacts());
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

// REFRESH USER
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    let token = state.auth.token;

    // Try getting token from localStorage if not in Redux
    if (!token) {
      token = localStorage.getItem("token");
      if (token) {
        setAuthHeader(token);
      }
    }

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      setAuthHeader(token);
      const res = await axios.get("/users/current");
      return res.data; // This is the user object
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
