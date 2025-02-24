import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Loading from "./components/shared/animation/Loading";
import OverviewProject from "./screens/admin/projects/Overview";
import Tasks from "./screens/admin/projects/Tasks";
import Main from "./screens/admin/projects/Main";
import CreateProject from "./screens/admin/projects/CreateProject";
import Teams from "./screens/admin/teams/Teams";
import Members from "./screens/admin/teams/Members";
import Room from "./screens/admin/room/Room";
import ManagerTeam from "./screens/admin/teams/ManagerTeam";
import NotFound from "./screens/admin/notfound/NotFound";
import Login from "./screens/user/Login";
import Overview from "./screens/user/Overview";
import Personnel from "./screens/admin/personnel/Personnel";

const PublicRoute = lazy(() => import("./routes/user/PublicRoute"));
const PrivateRoute = lazy(() => import("./routes/admin/PrivateRoute"));
const Dashboard = lazy(() => import("./screens/admin/Dashboard"));
const Projects = lazy(() => import("./screens/admin/projects/Projects"));
import ManagerPersonnel from "./screens/admin/personnel/ManagerPersonnel";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/overview" element={<PublicRoute />}>
            <Route index element={<Overview />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="teams/" element={<ManagerTeam />} />
            <Route path="personnel/" element={<Personnel />}>
              <Route path="manager-personnel" element={<ManagerPersonnel />} />
              {/* <Route path="organization-chart" element={<Members />} /> */}
            </Route>
            <Route path="teams/:id/" element={<Teams />}>
              <Route path="members" element={<Members />} />
              <Route path="room/:id" element={<Room />} />
            </Route>
            <Route path="projects/" element={<Main />} />
            <Route path="projects/new-project" element={<CreateProject />} />
            <Route path="projects/:id/" element={<Projects />}>
              <Route path="overview" element={<OverviewProject />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
