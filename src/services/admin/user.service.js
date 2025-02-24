import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const getMyInfo = createAsyncThunk("user/get-my-info", async () => {
  try {
    const response = await BaseUrl.get(`user/my-info`);
    return response.data;
  } catch (error) {
    return error;
  }
});
