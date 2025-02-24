import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const getAllTeams = createAsyncThunk("team/get-all-teams", async () => {
  try {
    const response = await BaseUrl.get(`team/all-teams`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getOneTeam = createAsyncThunk("team/get-one-team", async (id) => {
  try {
    const response = await BaseUrl.get(`team/one-team/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const createTeam = createAsyncThunk(
  "team/post-new-team",
  async (data) => {
    try {
      const response = await BaseUrl.post(`team/new-team`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
