import { TitleCover, CollapseButton } from "./styles";
import CollapseIcon from "@svg/expand.svg?react";
import EachChannelLoad from "@components/EachChannel/loading";

const Loading = () => {
  return (
    <>
      <TitleCover>
        <CollapseButton isDown={false} style={{ marginRight: "5px" }}>
          <CollapseIcon style={{ flexShrink: 0 }} />
        </CollapseButton>
        <h2>Channels</h2>
      </TitleCover>
      {[...Array(3)].map((_, index) => {
        return <EachChannelLoad key={`each_channel_load_${index}`} />;
      })}
    </>
  );
};

export default Loading;
