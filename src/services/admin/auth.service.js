import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const login = createAsyncThunk("auth/post-login", async (data) => {
  try {
    const response = await BaseUrl.post(`auth/login`, data);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const refreshToken = createAsyncThunk(
  "auth/post-refresh-token",
  async () => {
    try {
      const response = await BaseUrl.post(`auth/refresh-token`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const logout = createAsyncThunk("auth/post-logout", async () => {
  try {
    const response = await BaseUrl.post(`auth/logout`);
    return response.data;
  } catch (error) {
    return error;
  }
});
