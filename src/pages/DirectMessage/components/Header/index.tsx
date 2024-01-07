import { FC } from "react";
import { useQuery } from "react-query";
import { getFetcher } from "@utils/fetcher";

import { HeaderStyles } from "./style";
import { useParams } from "react-router-dom";
import Loading from "./loading";

interface Props {}

const Header: FC<Props> = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: otherUser } = useQuery<IUser>(
    ["otherMember", workspace, id],
    () => getFetcher(`/api/workspaces/${workspace}/members/${id}`),
    {
      enabled: !!workspace && !!id,
    }
  );

  return !otherUser ? (
    <Loading />
  ) : (
    <HeaderStyles>
      <h3># {otherUser.nickname}</h3>
    </HeaderStyles>
  );
};

export default Header;
