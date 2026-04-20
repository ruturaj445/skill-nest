import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { StudentDashboard } from "./pages/StudentDashboard";
import { ClientDashboard } from "./pages/ClientDashboard";
import { Marketplace } from "./pages/Marketplace";
import { TaskDetail } from "./pages/TaskDetail";
import { Teams } from "./pages/Teams";
import { Achievements } from "./pages/Achievements";
import { FindTalent } from "./pages/FindTalent";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/student",
    Component: StudentDashboard,
  },
  {
    path: "/client",
    Component: ClientDashboard,
  },
  {
    path: "/marketplace",
    Component: Marketplace,
  },
  {
    path: "/task/:id",
    Component: TaskDetail,
  },
  {
    path: "/teams",
    Component: Teams,
  },
  {
    path: "/achievements",
    Component: Achievements,
  },
  {
    path: "/find-talent",
    Component: FindTalent,
  },
  {
    path: "/student/settings",
    Component: Settings,
  },
  {
    path: "/client/settings",
    Component: Settings,
  },
]);