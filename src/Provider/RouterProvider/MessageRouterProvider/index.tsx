import { Routes, Route } from "react-router-dom";

import Channel from "@pages/Channel";
import DirectMessage from "@pages/DirectMessage";

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/channel/:channel" element={<Channel />} />
      <Route path="/dm/:id" element={<DirectMessage />} />
    </Routes>
  );
};
export default RouterProvider;
