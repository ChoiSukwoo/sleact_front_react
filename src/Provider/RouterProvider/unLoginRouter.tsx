import { FC, PropsWithChildren, ReactElement } from "react";

import { Navigate } from "react-router-dom";
interface Props {
  userData: IUser | false | undefined;
}

const UnLoginRouter: FC<PropsWithChildren<Props>> = ({ userData, children }) => {
  if (userData !== undefined && userData !== false) {
    // 가입자는 워크스페이스로
    return <Navigate to="/workspace/slack/channel/일반" replace={true} />;
  }

  return children as ReactElement | null;
};

export default UnLoginRouter;
