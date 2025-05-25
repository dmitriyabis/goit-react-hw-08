import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader, clearAuthHeader } from "../contacts/operations";
import { resetContacts } from "../contacts/slice";

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/users/signup", credentials);
      setAuthHeader(res.data.token);
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
      const res = await api.post("/users/login", credentials);
      setAuthHeader(res.data.token);
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
    await api.post("/users/logout");
    clearAuthHeader();
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

    if (!token) {
      token = localStorage.getItem("token");
      if (token) {
        setAuthHeader(token);
      }
    }

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      setAuthHeader(token);
      const res = await api.get("/users/current");
      return res.data;
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
