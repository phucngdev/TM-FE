import { createSlice } from "@reduxjs/toolkit";
import { createTag, getAllTags } from "../../services/admin/tag.service";

const tagSlice = createSlice({
  name: "tags",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload.tags;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createTag.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data.push(action.payload.newTag);
      })
      .addCase(createTag.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default tagSlice.reducer;
