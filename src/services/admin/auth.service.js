import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

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
