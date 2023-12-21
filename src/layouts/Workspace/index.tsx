//라이브러리
import { FC, FormEventHandler, useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router";
import gravatar from "gravatar";
import { ToastContainer, toast } from "react-toastify";

//Page
import Channel from "@pages/Channel";
import DirectMessage from "@pages/DirectMessage";

//Style
import { Button } from "@components/Button";
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "./styles";
//type

//CustomModule
import fetcher, { getFetcher } from "@utils/fetcher";
import useInput from "@hooks/useInput";
import ChannelList from "@components/ChannelList";
// import DMList from '@components/DMList';
import Menu from "@components/Menu";
import useSocket from "@hooks/useSocket";
// import Channel from '@pages/Channel';
// import DirectMessage from '@pages/DirectMessage';
// import gravatar from 'gravatar';
import Modal from "@components/Modal";
import CreateChannelModal from "@components/CreateChannelModal";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";
import InviteChannelModal from "@components/InviteChannelModal";
import DMList from "@components/DMList";
import { useQuery } from "react-query";
import useAxiosPost from "@utils/useAxiosPost";
import { LogoutFailToken, LogoutSuccessToken } from "@const/Toast";
import { InputText } from "@components/InputText";
import { LabelText } from "@components/LabelText";
import CreateWorkspaceModal from "@components/CreateWorkspaceModal";

const Workspace: FC = () => {
  const { workspace, channel, id } = useParams<{ workspace?: string; channel?: string; id?: string }>();
  console.log(workspace, channel, id);
  const { data: userData, refetch: userDataRefetch } = useQuery<IUser | false, Error>("userInfo", () =>
    getFetcher("/api/users")
  );
  const { data: channelData } = useQuery<IChannel[], Error>(
    "channelData",
    () => getFetcher(`/api/workspaces/${workspace}/channels`),
    {
      enabled: userData !== undefined,
    }
  );

  // console.log('params', params, 'location', location, 'routeMatch', matchRoutes, 'history', history);
  const [socket, disconnectSocket] = useSocket(workspace);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChanneleModal, setShowInviteChanneleModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput("");

  const postRequest = useAxiosPost();
  const navigate = useNavigate();

  const onLogOut = useCallback(() => {
    postRequest("/api/users/logout", null, { withCredentials: true })
      .then(() => {
        toast.success(LogoutSuccessToken.msg, { toastId: LogoutSuccessToken.id });
        navigate("/");
      })
      .catch((error: ApiErrorDto | undefined) => {
        if (error) {
          toast.error(LogoutFailToken.msg, { toastId: LogoutFailToken.id });
          console.log(error.message || "로그아웃에 실패하엿습니다.");
        } else {
          toast.error(LogoutFailToken.msg, { toastId: LogoutFailToken.id });
        }
      })
      .finally(() => {
        userDataRefetch();
      });
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChanneleModal(false);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  //워크스페이스 변경시 연결 종료
  useEffect(() => {
    return () => {
      console.info("disconnect socket", workspace);
      disconnectSocket();
    };
  }, [disconnectSocket, workspace]);

  useEffect(() => {
    if (channelData && userData && socket) {
      console.info("로그인하자", socket);
      socket?.emit("login", { id: userData?.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, userData, channelData]);

  if (userData === false) {
    return <Navigate to="/login" replace={true} />;
  }
  console.log("userData : ", userData);

  return (
    <div>
      <Header>
        {userData && (
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg src={gravatar.url(userData.email, { s: "28px", d: "retro" })} alt={userData.nickname} />
            </span>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.email, { s: "36px", d: "retro" })} alt={userData.nickname} />
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
              </Menu>
            )}
          </RightMenu>
        )}
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData?.workspaces.map((workspace) => {
            return (
              <Link key={workspace.id} to={`/workspace/${workspace.url}/channel/일반`}>
                <WorkspaceButton>{workspace.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>
            {userData?.workspaces.find((v) => v.url === workspace)?.name}
          </WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>{userData?.workspaces.find((v) => v.url === workspace)?.name}</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogOut}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <CreateWorkspaceModal isShow={showCreateWorkspaceModal} onClose={onCloseModal} />
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChanneleModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChanneleModal}
      />
    </div>
  );
};

export default Workspace;
