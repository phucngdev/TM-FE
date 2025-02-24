import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/auth.useSlice";
import userSlice from "../useSlice/user.useSlice";
import personnelSlice from "../useSlice/personnel.useSlice";
import teamsSlice from "../useSlice/teams.useSlice";
import projectSlice from "../useSlice/project.useSlice";
import tagSlice from "../useSlice/tag.useSlice";
import taskSlice from "../useSlice/task.useSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    personnel: personnelSlice,
    teams: teamsSlice,
    project: projectSlice,
    tags: tagSlice,
    tasks: taskSlice,
  },
});

export default store;
