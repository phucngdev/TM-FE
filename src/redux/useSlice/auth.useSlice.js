import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { login } from "../../services/admin/auth.service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder;
    //   .addCase(login.pending, (state) => {
    //     state.status = "Pending!";
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.status = "Successfully!";
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.status = "Failed!";
    //     state.error = action.error.message;
    //   });
  },
});

export default authSlice.reducer;
