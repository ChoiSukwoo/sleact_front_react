import { FC } from "react";

import { DmLoading, DmLoadingCover, IsOnlineChecker } from "./styles";

interface Props {}

const EachDM: FC<Props> = () => {
  return (
    <DmLoadingCover>
      <IsOnlineChecker isOnline={false} />
      <DmLoading />
    </DmLoadingCover>
  );
};

export default EachDM;
