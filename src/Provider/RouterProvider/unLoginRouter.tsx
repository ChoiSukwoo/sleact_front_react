import { FC, PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";
interface Props {
  userData: IUser | false | undefined;
}

const UnLoginRouter: FC<PropsWithChildren<Props>> = ({ userData, children }) => {
  return userData ? <Navigate to="/workspace/sleact/channel/일반" replace={true} /> : children;
};

export default UnLoginRouter;
