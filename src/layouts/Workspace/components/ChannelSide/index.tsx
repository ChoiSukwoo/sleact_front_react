import { Channels, WorkspaceName, MenuScroll, WorkspaceModal } from "./style";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { FC } from "react";

import { getFetcher } from "@utils/fetcher";

import ChannelList from "@components/ChannelList";
import DMList from "@components/DMList";
import Menu from "@components/Menu";
import Loading from "./Loading";

interface Props {
  isWorkspaceMenu: boolean;
  toggleWorkspaceMenu: () => void;
  onClickInviteWorkspace: () => void;
  onClickAddChannel: () => void;
  onCloseModal: () => void;
}

export const ChannelSide: FC<Props> = ({
  isWorkspaceMenu,
  toggleWorkspaceMenu,
  onClickInviteWorkspace,
  onClickAddChannel,
  onCloseModal,
}) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));

  return userData === undefined ? (
    <Loading />
  ) : (
    <Channels>
      <WorkspaceName onClick={toggleWorkspaceMenu}>
        {userData?.workspaces.find((v) => v.url === workspace)?.name}
      </WorkspaceName>
      <MenuScroll>
        <Menu show={isWorkspaceMenu} onCloseModal={onCloseModal} style={{ top: 95, left: 80 }}>
          <WorkspaceModal>
            <h2>{userData?.workspaces.find((v) => v.url === workspace)?.name}</h2>
            <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
            <button onClick={onClickAddChannel}>채널 만들기</button>
          </WorkspaceModal>
        </Menu>
        <ChannelList />
        <DMList />
      </MenuScroll>
    </Channels>
  );
};

export default ChannelSide;
