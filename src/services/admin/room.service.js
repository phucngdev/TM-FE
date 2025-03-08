import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const getAllRoomChat = createAsyncThunk(
  "room/get-all-room-chat",
  async () => {
    try {
      const response = await BaseUrl.get(`room/all-room`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOneRoomChat = createAsyncThunk(
  "room/get-one-room-chat",
  async (id) => {
    try {
      const response = await BaseUrl.get(`room/one-room/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const createRoom = createAsyncThunk(
  "room/post-new-room-chat",
  async (data) => {
    try {
      const response = await BaseUrl.post(`room/new-room`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const handleCheckRoom = createAsyncThunk(
  "room/get-check-room-chat",
  async (id) => {
    try {
      const response = await BaseUrl.get(`room/check-room/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
