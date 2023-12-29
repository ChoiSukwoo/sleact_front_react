import { FC } from "react";
import { ChannelLoading, ChannelLoadingCover } from "./styles";

interface Props {}

const Laoding: FC<Props> = () => {
  return (
    <ChannelLoadingCover>
      <ChannelLoading />
    </ChannelLoadingCover>
  );
};

export default Laoding;
