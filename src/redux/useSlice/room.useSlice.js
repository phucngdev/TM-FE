import { createSlice } from "@reduxjs/toolkit";
import {
  getAllRoomChat,
  createRoom,
  getOneRoomChat,
} from "../../services/admin/room.service";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    data: [],
    dataEdit: null,
    chatNow: {},
    status: "idle",
    error: null,
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
    addMessage: (state, action) => {
      const { roomId, message } = action.payload;
      if (!state.rooms[roomId]) {
        state.rooms[roomId] = { messages: [], page: 1, hasMore: true };
      }
      state.rooms[roomId].messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "Successfully!";
        if (action.payload.status === 201) {
          state.data.unshift(action.payload.newRoom);
        }
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneRoomChat.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneRoomChat.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.chatNow.unshift(action.payload.room);
      })
      .addCase(getOneRoomChat.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getAllRoomChat.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllRoomChat.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload.rooms;
      })
      .addCase(getAllRoomChat.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default roomSlice.reducer;
