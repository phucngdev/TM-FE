import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const getAllTasks = createAsyncThunk(
  "task/get-all-tasks",
  async (id) => {
    try {
      const response = await BaseUrl.get(`task/all-tasks/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const createTask = createAsyncThunk(
  "task/post-new-task",
  async (data) => {
    try {
      const response = await BaseUrl.post(`task/new-task`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
