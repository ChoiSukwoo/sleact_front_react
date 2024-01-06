import { FC, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { getFetcher } from "@utils/fetcher";

import { channelState } from "@recoil/atom/channelType";

import { HeaderStyles, InviteButton } from "./style";
import PeopleIcon from "@svg/people.svg?react";
import { currentModalState } from "@recoil/atom/modal";
import { useParams } from "react-router-dom";

interface Props {}

const Header: FC<Props> = () => {
  const channel = useRecoilValue(channelState);
  const { workspace } = useParams<{ workspace: string }>();
  const setCurrentModal = useSetRecoilState(currentModalState);

  const { data: channelMembersData } = useQuery<IUser[]>(
    ["channelMembersData", workspace, channel],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel}/members`),
    {
      enabled: !!workspace && !!channel,
    }
  );

  const onClickInviteChannel = useCallback(() => {
    setCurrentModal("inviteChannel");
  }, []);

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
