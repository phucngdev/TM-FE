import { createSlice } from "@reduxjs/toolkit";

const popupchatSlice = createSlice({
  name: "popupchat",
  initialState: {
    isPopupChatOpen: false,
    listChat: [],
  },
  reducers: {
    togglePopupChat: (state) => {
      state.isPopupChatOpen = !state.isPopupChatOpen;
    },
    openPopupChat: (state) => {
      state.isPopupChatOpen = true;
    },
    closePopupChat: (state) => {
      state.isPopupChatOpen = false;
    },
    closeChatItem: (state, action) => {
      state.listChat = state.listChat.filter(
        (c) => c.room._id !== action.payload
      );
    },
    resize: (state, action) => {
      const { chatId, isMinimized } = action.payload;
      state.listChat = state.listChat.map((c) =>
        c.room._id === chatId ? { ...c, isMinimized } : c
      );
    },
    addChat: (state, action) => {
      const exists = state.listChat.find(
        (c) => c.room._id === action.payload._id
      );
      if (exists) {
        state.listChat = state.listChat;
      } else {
        state.listChat = [
          ...state.listChat,
          { room: action.payload, isMinimized: false },
        ];
        if (state.listChat.length > 2) {
          state.listChat = state.listChat.slice(1);
        }
      }
    },
    addMessage: (state, action) => {
      const { roomId, message } = action.payload;
      const chat = state.listChat.find((c) => c.room._id === roomId);
      if (chat) {
        chat.room.messages.unshift(message);
      }
      state.listChat = [...state.listChat];
    },
  },
});

export const {
  togglePopupChat,
  openPopupChat,
  closePopupChat,
  addChat,
  resize,
  closeChatItem,
  addMessage,
} = popupchatSlice.actions;
export default popupchatSlice.reducer;
