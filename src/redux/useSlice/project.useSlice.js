import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  getAllProjects,
  getOneProject,
} from "../../services/admin/project.service";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload.projects;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneProject.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneProject.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload.project;
      })
      .addCase(getOneProject.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createProject.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data.push(action.payload.newPersonnel);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
