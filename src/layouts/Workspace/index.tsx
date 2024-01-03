//라이브러리
import { FC, useEffect } from "react";
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
      <Header />
      <WorkspaceWrapper>
        <WorkspaceSide />
        <ChannelSide />
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal />
      <CreateChannelModal />
      <InviteWorkspaceModal />
      <InviteChannelModal />
    </div>
  );
};

export default Workspace;
