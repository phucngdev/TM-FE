import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  getAllTasks,
  getOneTask,
  swapTaskStatus,
  swapTaskStatusLocal,
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
      .addCase(swapTaskStatusLocal.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(swapTaskStatusLocal.fulfilled, (state, action) => {
        state.status = "Successfully!";
        const { activeId, overId, activeIndex, overIndex, status } =
          action.payload;

        const tasks = state.data[status];
        if (!tasks) return;

        const task1Index = tasks.findIndex((task) => task._id === activeId);
        const task2Index = tasks.findIndex((task) => task._id === overId);
        if (task1Index === -1 || task2Index === -1) return;

        [tasks[task1Index], tasks[task2Index]] = [
          tasks[task2Index],
          tasks[task1Index],
        ];

        tasks[task1Index].status_index = activeIndex;
        tasks[task2Index].status_index = overIndex;
      })
      .addCase(swapTaskStatusLocal.rejected, (state, action) => {
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
