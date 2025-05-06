// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import ProjectList from "../pages/ProjectList/ProjectList";
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail";
import CreateProject from "../pages/CreateProject/CreateProject";
import EditProject from "../pages/EditProject/EditProject";

import PrivateRoute from "../components/auth/PrivateRoute";
import GithubCallback from "../pages/GithubCallback/GithubCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // 기본 경로
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "profile",
        element: <PrivateRoute />,
        children: [
          {
            index: true, // 기본 경로
            element: <Profile />
          }
        ]
      },
      {
        path: "projects",
        element: <PrivateRoute />,
        children: [
          {
            index: true, // 기본 경로
            element: <ProjectList />
          },
          {
            path: "create",
            element: <CreateProject />
          },
          {
            path: ":id",
            element: <ProjectDetail />
          },
          {
            path: ":id/edit",
            element: <EditProject />
          }
        ]
      },
      {
        path: "auth/github/callback",
        element: <GithubCallback />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export default router;
