import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Workspace = loadable(() => import("@layouts/Workspace"));

const App = () => (
  <Routes>
    <Route path="*" element={<LogIn />} />
    <Route path="/" element={<LogIn />} />
    <Route path="/login" element={<LogIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/workspace/:workspace/*" element={<Workspace />} />
  </Routes>
);

export default App;
