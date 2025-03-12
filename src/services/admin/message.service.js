import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/instance";

export const getMessagesByRoom = createAsyncThunk(
  "messages/get-messages",
  async ({ roomId, limit = 10, page = 1 }) => {
    try {
      const response = await BaseUrl.get(
        `message/get-message/${roomId}?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch messages" };
    }
  }
);
