import { FC, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getFetcher } from "@utils/fetcher";

import channelTypeState from "@recoil/atom/channelType";
import workspaceState from "@recoil/atom/workspace";

import { HeaderStyles, InviteButton } from "./style";
import PeopleIcon from "@svg/people.svg?react";

interface Props {}

const Header: FC<Props> = () => {
  const { id: channel } = useRecoilValue(channelTypeState);
  const workspace = useRecoilValue(workspaceState);

  const { data: channelMembersData } = useQuery<IUser[]>(
    ["channelMembersData", workspace, channel],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel}/members`),
    {
      enabled: workspace !== undefined && channel !== undefined,
    }
  );

  const onClickInviteChannel = useCallback(() => {}, []);

  return (
    <HeaderStyles>
      <h3># {channel}</h3>
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>{channelMembersData?.length}</span>
        <InviteButton onClick={onClickInviteChannel}>
          <PeopleIcon />
        </InviteButton>
      </div>
    </HeaderStyles>
  );
};

export default Header;
