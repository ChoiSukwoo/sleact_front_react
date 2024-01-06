import { Channels, WorkspaceName, MenuScroll, WorkspaceModal } from "./style";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { FC, useCallback } from "react";

import { getFetcher } from "@utils/fetcher";

import ChannelList from "@components/ChannelList";
import DMList from "@components/DMList";
import Menu from "@components/Menu";
import Loading from "./Loading";
import { useRecoilState } from "recoil";
import { currentModalState } from "@recoil/atom/modal";

interface Props {}

export const ChannelSide: FC<Props> = ({}) => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();

  //sever Data
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));

  //recoil Data
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);

  const isWorkspaceMenu = currentModal === "workspaceMenu";
  const onClickWorkspaceMenu = useCallback(() => {
    setCurrentModal("workspaceMenu");
  }, []);
  const onClickInviteWorkspace = useCallback(() => {
    setCurrentModal("inviteWorkspace");
  }, []);
  const onClickCreateChannel = useCallback(() => {
    setCurrentModal("createChannel");
  }, []);

  return userData === undefined ? (
    <Loading />
  ) : (
    <Channels>
      <WorkspaceName onClick={onClickWorkspaceMenu}>
        {userData?.workspaces.find((v) => v.url === workspace)?.name}
      </WorkspaceName>
      <MenuScroll>
        {isWorkspaceMenu && (
          <Menu style={{ top: 95, left: 80 }}>
            <WorkspaceModal>
              <h2>{userData?.workspaces.find((v) => v.url === workspace)?.name}</h2>
              <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
              <button onClick={onClickCreateChannel}>채널 만들기</button>
            </WorkspaceModal>
          </Menu>
        )}
        <ChannelList />
        <DMList />
      </MenuScroll>
    </Channels>
  );
};

export default ChannelSide;
