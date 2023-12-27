import { FC } from "react";
import { AddButton, LodingButton, Workspaces } from "./style";

const Loading: FC = () => {
  return (
    <Workspaces>
      {[...Array(3)].map((_, index) => {
        return <LodingButton key={index} />;
      })}
      <AddButton>+</AddButton>
    </Workspaces>
  );
};

export default Loading;
