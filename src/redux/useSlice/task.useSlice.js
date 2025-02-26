import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  getAllTasks,
  getOneTask,
} from "../../services/admin/task.service";

const statusOption = ["todo", "in_progress", "review", "done"];

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    totalTasks: 0,
    donePercent: 0,
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload.tasks;
        state.totalTasks = action.payload.totalTasks;
        state.donePercent = action.payload.donePercent;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createTask.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data[action.payload.newTask.status].push(action.payload.newTask);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneTask.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneTask.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload.task;
      })
      .addCase(getOneTask.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
