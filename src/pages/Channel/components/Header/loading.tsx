import { FC } from "react";
import { HeaderStyles, InviteButton } from "./style";
import PeopleIcon from "@svg/people.svg?react";

interface Props {}

const Loading: FC<Props> = () => {
  return (
    <HeaderStyles>
      <h3># </h3>
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>{0}</span>
        <InviteButton>
          <PeopleIcon />
        </InviteButton>
      </div>
    </HeaderStyles>
  );
};

export default Loading;
