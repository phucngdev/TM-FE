import { createSlice } from "@reduxjs/toolkit";
import { getMyInfo } from "../../services/admin/user.service";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "Successfully!";
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
