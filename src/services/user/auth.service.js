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

export const register = createAsyncThunk("auth/post-register", async (data) => {
  try {
    const response = await BaseUrl.post(`auth/register`, data);
    return response.data;
  } catch (error) {
    return error;
  }
});
