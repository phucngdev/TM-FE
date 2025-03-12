import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  getAllMyTasks,
  getAllTasks,
  getOneTask,
  swapTaskStatus,
  swapTaskStatusLocal,
} from "../../services/admin/task.service";

const statusOption = ["todo", "in_progress", "review", "done"];

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: {},
    totalTasks: 0,
    donePercent: 0,
    dataEdit: null,
    myTask: null,
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
      .addCase(getAllMyTasks.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllMyTasks.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.myTask = action.payload.myTask;
      })
      .addCase(getAllMyTasks.rejected, (state, action) => {
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
        const { activeId, activeIndex, overIndex, activeStatus, overStatus } =
          action.payload;

        // Kiểm tra nếu danh sách không tồn tại
        if (!state.data[activeStatus] || !state.data[overStatus]) {
          console.log("Lỗi: Không tìm thấy danh sách");
          return;
        }

        // Tìm task đang di chuyển
        const activeTask = state.data[activeStatus].find(
          (task) => task._id === activeId
        );
        if (!activeTask) return;

        // 🟢 Nếu kéo trong cùng một danh sách (status không đổi)
        if (activeStatus === overStatus) {
          const list = state.data[activeStatus];

          // Xoá task khỏi vị trí cũ
          list.splice(activeIndex, 1);
          // Chèn task vào vị trí mới
          list.splice(overIndex, 0, activeTask);
        }
        // 🔴 Nếu kéo sang danh sách khác (status thay đổi)
        else {
          // Xóa task khỏi danh sách cũ
          state.data[activeStatus] = state.data[activeStatus].filter(
            (task) => task._id !== activeId
          );

          // Cập nhật trạng thái mới cho task
          activeTask.status = overStatus;

          // Đảm bảo không bị thêm trùng
          if (
            !state.data[overStatus].some((task) => task._id === activeTask._id)
          ) {
            state.data[overStatus].splice(overIndex, 0, activeTask); // Thêm vào danh sách mới
          }
        }
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
