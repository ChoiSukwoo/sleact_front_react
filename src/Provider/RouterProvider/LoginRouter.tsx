import { FC, PropsWithChildren, ReactElement } from "react";

import { Navigate } from "react-router-dom";
interface Props {
  userData: IUser | false | undefined;
}

const LoginRouter: FC<PropsWithChildren<Props>> = ({ userData, children }) => {
  if (userData !== undefined && userData === false) {
    // 가입자는 워크스페이스로
    return <Navigate to="/login" replace={true} />;
  }

  return children as ReactElement | null;
};

export default LoginRouter;
