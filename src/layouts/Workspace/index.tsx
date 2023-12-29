//라이브러리
import { FC, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";

//Page
import Channel from "@pages/Channel";
import DirectMessage from "@pages/DirectMessage";

//Style
import { Chats, WorkspaceWrapper } from "./styles";

//CustomModule
import CreateWorkspaceModal from "@components/CreateWorkspaceModal";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";
import CreateChannelModal from "@components/CreateChannelModal";
import InviteChannelModal from "@components/InviteChannelModal";

import WorkspaceSide from "./components/WorkspaceSide";
import Header from "./components/Header";

import { getFetcher } from "@utils/fetcher";
import useSocket from "@hooks/useSocket";
import ChannelSide from "./components/ChannelSide";
import { useSetRecoilState } from "recoil";
import workspaceState from "@recoil/atom/workspace";

const Workspace: FC = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const { data: channelData } = useQuery<IChannel[], Error>(
    "channelData",
    () => getFetcher(`/api/workspaces/${workspace}/channels`),
    {
      enabled: userData !== undefined,
    }
  );

  const setWorkspace = useSetRecoilState(workspaceState);

  const [socket, disconnectSocket] = useSocket(workspace);
  const [isCreateWorkspaceModal, setCreateWorkspaceModal] = useState(false);
  const [isInviteWorkspaceModal, setInviteWorkspaceModal] = useState(false);
  const [isInviteChanneleModal, setInviteChanneleModal] = useState(false);
  const [isCreateChannelModal, setCreateChannelModal] = useState(false);
  const [isWorkspaceMenu, setWorkspaceMenu] = useState(false);
  const [isUserMenu, setUserMenu] = useState(false);

  const onClickCreateWorkspace = useCallback(() => {
    setCreateWorkspaceModal(true);
  }, []);

  const toggleWorkspaceMenu = useCallback(() => {
    setWorkspaceMenu((prev) => !prev);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    onCloseModal();
    setInviteWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    onCloseModal();
    setCreateChannelModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setCreateWorkspaceModal(false);
    setCreateChannelModal(false);
    setInviteWorkspaceModal(false);
    setInviteChanneleModal(false);
    setWorkspaceMenu(false);
    setUserMenu(false);
  }, []);

  useEffect(() => {
    setWorkspace(workspace);
    return () => {
      setWorkspace(undefined);
    };
  }, [workspace]);

  //워크스페이스 변경시 연결 종료
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  useEffect(() => {
    if (channelData && userData && socket) {
      socket.emit("login", { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, userData, channelData]);

  return (
    <div>
      <Header isShowUserMenu={isUserMenu} setShowUserMenu={setUserMenu} onCloseModal={onCloseModal} />
      <WorkspaceWrapper>
        <WorkspaceSide onClickCreateWorkspace={onClickCreateWorkspace} />
        <ChannelSide
          isWorkspaceMenu={isWorkspaceMenu}
          toggleWorkspaceMenu={toggleWorkspaceMenu}
          onClickInviteWorkspace={onClickInviteWorkspace}
          onClickAddChannel={onClickAddChannel}
          onCloseModal={onCloseModal}
        />
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal isShow={isCreateWorkspaceModal} onClose={onCloseModal} />
      <CreateChannelModal isShow={isCreateChannelModal} onClose={onCloseModal} />
      <InviteWorkspaceModal isShow={isInviteWorkspaceModal} onClose={onCloseModal} />
      <InviteChannelModal
        show={isInviteChanneleModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setInviteChanneleModal}
      />
    </div>
  );
};

export default Workspace;
