import { FC, PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";
interface Props {
  userData: IUser | false | undefined;
}

const LoginRouter: FC<PropsWithChildren<Props>> = ({ userData, children }) => {
  return userData === false ? <Navigate to="/login" replace={true} /> : children;
};

export default LoginRouter;
