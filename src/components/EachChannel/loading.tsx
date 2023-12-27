import { FC } from "react";
import { ChannelLoading, ChannelLoadingCover } from "./styles";

interface Props {
  key: number;
}

const Laoding: FC<Props> = ({ key }) => {
  return (
    <ChannelLoadingCover key={`each_channel_loading_${key}`}>
      <ChannelLoading />
    </ChannelLoadingCover>
  );
};

export default Laoding;
