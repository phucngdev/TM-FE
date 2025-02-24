import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const createProject = createAsyncThunk(
  "project/post-new-project",
  async (data) => {
    try {
      const response = await BaseUrl.post(`project/new-project`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllProjects = createAsyncThunk(
  "project/get-all-project",
  async () => {
    try {
      const response = await BaseUrl.get(`project/all-projects`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOneProject = createAsyncThunk(
  "project/get-one-project",
  async (id) => {
    console.log("🚀 ~ id:", id);
    try {
      const response = await BaseUrl.get(`project/one-project/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
