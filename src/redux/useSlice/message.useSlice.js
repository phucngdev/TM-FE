import { createSlice } from "@reduxjs/toolkit";
import { getMessagesByRoom } from "../../services/admin/message.service";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    rooms: {}, // Object lưu tin nhắn theo từng phòng { roomId: { messages, page, hasMore } }
    status: "idle",
  },
  reducers: {
    resetMessages: (state, action) => {
      const { roomId } = action.payload;
      if (roomId) {
        state.rooms[roomId] = { messages: [], page: 1, hasMore: true };
      } else {
        state.rooms = {};
      }
    },
    // addMessage: (state, action) => {
    //   const { roomId, message } = action.payload;
    //   console.log("🚀 ~ action.payload:", action.payload);
    //   if (!state.rooms[roomId]) {
    //     state.rooms[roomId] = { messages: [], page: 1, hasMore: true };
    //   }
    //   state.rooms[roomId].messages.unshift(message);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesByRoom.pending, (state, action) => {
        const { roomId } = action.meta.arg; // Lấy roomId từ action
        if (!state.rooms[roomId]) {
          state.rooms[roomId] = { messages: [], page: 1, hasMore: true };
        }
        state.status = "loading";
      })
      .addCase(getMessagesByRoom.fulfilled, (state, action) => {
        const { roomId, messages, hasMore } = action.payload;
        if (!state.rooms[roomId]) {
          state.rooms[roomId] = { messages: [], page: 1, hasMore: true };
        }
        state.rooms[roomId].messages = [
          ...messages,
          ...state.rooms[roomId].messages,
        ]; // Load tin nhắn cũ lên đầu
        state.rooms[roomId].page += 1;
        state.rooms[roomId].hasMore = hasMore;
        state.status = "succeeded";
      })
      .addCase(getMessagesByRoom.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
