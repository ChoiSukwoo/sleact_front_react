import { FC } from "react";

import { DmLoading, DmLoadingCover, IsOnlineChecker } from "./styles";

interface Props {
  key: number;
}

const EachDM: FC<Props> = ({ key }) => {
  return (
    <DmLoadingCover key={`each_dm_loading_${key}`}>
      <IsOnlineChecker isOnline={false} />
      <DmLoading />
    </DmLoadingCover>
  );
};

export default EachDM;
