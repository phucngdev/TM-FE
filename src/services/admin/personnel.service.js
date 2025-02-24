import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const createPersonnel = createAsyncThunk(
  "user/post-new-personnel",
  async (data) => {
    try {
      const response = await BaseUrl.post(`user/new-personnel`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllPersonnel = createAsyncThunk(
  "user/get-all-personnel",
  async () => {
    try {
      const response = await BaseUrl.get(`user/personnels`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
