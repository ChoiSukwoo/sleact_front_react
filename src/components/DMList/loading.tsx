import { TitleCover, CollapseButton } from "./styles";
import CollapseIcon from "@svg/expand.svg?react";
import EachDmLoad from "@components/EachDM/loading";

const Loading = () => {
  return (
    <>
      <TitleCover>
        <CollapseButton isDown={false} style={{ marginRight: "5px" }}>
          <CollapseIcon style={{ flexShrink: 0 }} />
        </CollapseButton>
        <h2>Direct Messages</h2>
      </TitleCover>
      {[...Array(3)].map((_, index) => {
        return <EachDmLoad key={index} />;
      })}
    </>
  );
};

export default Loading;
