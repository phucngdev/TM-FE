import { createSlice } from "@reduxjs/toolkit";
import {
  createTeam,
  getAllTeams,
  getOneTeam,
} from "../../services/admin/team.service";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload.teams;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneTeam.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneTeam.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload.team;
      })
      .addCase(getOneTeam.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createTeam.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data.push(action.payload.newTeam);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default teamsSlice.reducer;
