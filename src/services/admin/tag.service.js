import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const getAllTags = createAsyncThunk("tag/get-all-tags", async (id) => {
  try {
    const response = await BaseUrl.get(`tag/all-tags/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const createTag = createAsyncThunk("tag/post-new-tag", async (data) => {
  try {
    const response = await BaseUrl.post(`tag/new-tag`, data);
    return response.data;
  } catch (error) {
    return error;
  }
});
