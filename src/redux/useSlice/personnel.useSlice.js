import { createSlice } from "@reduxjs/toolkit";
import {
  createPersonnel,
  getAllPersonnel,
} from "../../services/admin/personnel.service";

const personnelSlice = createSlice({
  name: "personnel",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPersonnel.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllPersonnel.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllPersonnel.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createPersonnel.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createPersonnel.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data.push(action.payload.newPersonnel);
      })
      .addCase(createPersonnel.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default personnelSlice.reducer;
