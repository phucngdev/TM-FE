import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/auth.useSlice";
import userSlice from "../useSlice/user.useSlice";
import personnelSlice from "../useSlice/personnel.useSlice";
import teamsSlice from "../useSlice/teams.useSlice";
import projectSlice from "../useSlice/project.useSlice";
import tagSlice from "../useSlice/tag.useSlice";
import taskSlice from "../useSlice/task.useSlice";
import roomSlice from "../useSlice/room.useSlice";
import popupchatSlice from "../useSlice/popupchat.useSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    personnel: personnelSlice,
    teams: teamsSlice,
    project: projectSlice,
    tags: tagSlice,
    tasks: taskSlice,
    rooms: roomSlice,
    popupchat: popupchatSlice,
  },
});

export default store;
