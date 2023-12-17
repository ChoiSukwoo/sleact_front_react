import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { useQuery } from "react-query";
import { ReactElement } from "react";

import { getFetcher } from "@utils/fetcher";
import LoginRouter from "./loginRouter";
import UnLoginRouter from "./unLoginRouter";

const LogIn = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Workspace = loadable(() => import("@layouts/Workspace"));

type AppRoute = {
  path: string;
  Component: () => ReactElement;
};

const unLoginRouters: AppRoute[] = [
  { path: "*", Component: () => <LogIn /> },
  { path: "/", Component: () => <LogIn /> },
  { path: "/login", Component: () => <LogIn /> },
  { path: "/signUp", Component: () => <SignUp /> },
];

const loginRouters: AppRoute[] = [{ path: "/workspace/:workspace/*", Component: () => <Workspace /> }];

const RouterProvider = () => {
  const { data: userData } = useQuery<IUser | false, Error>("userInfo", () => getFetcher("/api/users"));
  return (
    <Routes>
      {unLoginRouters.map(({ path, Component }, idx) => (
        <Route
          key={idx}
          path={path}
          element={
            <UnLoginRouter userData={userData}>
              <Component />
            </UnLoginRouter>
          }
        />
      ))}

      {loginRouters.map(({ path, Component }, idx) => (
        <Route
          key={idx}
          path={path}
          element={
            <LoginRouter userData={userData}>
              <Component />
            </LoginRouter>
          }
        />
      ))}
    </Routes>
  );
};
export default RouterProvider;
