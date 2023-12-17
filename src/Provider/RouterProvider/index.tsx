import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { useQuery } from "react-query";
import LoginRouter from "./LoginRouter";

const LogIn = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Workspace = loadable(() => import("@layouts/Workspace"));

const RouterProvider = () => {
  const { data: userData } = useQuery<IUser | false, Error>("userInfo", () => getFetcher("/api/users"));

  return (
    <Routes>
      <Route path="*" element={<LogIn />} />
      <Route path="/" element={<LogIn />} />
      <LoginRouter userData={userData}>
        <Route path="/login" element={<LogIn />} />
      </LoginRouter>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/:workspace/*" element={<Workspace />} />
    </Routes>
  );
};
export default RouterProvider;
