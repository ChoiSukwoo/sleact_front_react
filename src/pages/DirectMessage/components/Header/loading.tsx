import { FC } from "react";
import { HeaderStyles } from "./style";

interface Props {}

const Loading: FC<Props> = () => {
  return (
    <HeaderStyles>
      <h3># </h3>
    </HeaderStyles>
  );
};

export default Loading;
