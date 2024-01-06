//라이브러리
import { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { InvalidWorkspacesToken } from "@const/Toast";

const Workspace: FC = () => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();

  //sever Data
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const { data: channelData } = useQuery<IChannel[], Error>(
    ["channelData", workspace],
    () => getFetcher(`/api/workspaces/${workspace}/channels`),
    {
      enabled: !!workspace,
    }
  );

  //hook
  const navigate = useNavigate();
  const [socket, disconnectSocket] = useSocket(workspace);

  //허용되지 않은 workspace 접근시 접근제한
  useEffect(() => {
    if (!userData || !workspace) {
      return;
    }

    if (!userData.workspaces.some((w) => w.url === workspace)) {
      const redirectWorkspace = userData.workspaces[0];
      toast.error(InvalidWorkspacesToken.msg(workspace, redirectWorkspace.name), {
        toastId: InvalidWorkspacesToken.id,
      });
      navigate(`/workspace/${redirectWorkspace.url}/channel/일반`);
    }
  }, [userData, workspace]);

  //워크스페이스 변경시 연결 종료
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  //Websocket에 login요청 내가 가입된 Channel에 웹소켓 연결
  useEffect(() => {
    if (channelData && userData && socket) {
      socket.emit("login", { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, userData, channelData]);

  return (
    <>
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
    </>
  );
};

export default Workspace;
