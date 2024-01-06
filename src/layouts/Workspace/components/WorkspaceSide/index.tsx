import { useQuery } from "react-query";
import { AddButton, WorkspaceButton, Workspaces } from "./style";
import { getFetcher } from "@utils/fetcher";
import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { currentModalState } from "@recoil/atom/modal";
import { useSetRecoilState } from "recoil";

interface Props {}

export const WorkspaceSide: FC<Props> = ({}) => {
  //sever Data
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  //recoil Data
  const setCurrentModal = useSetRecoilState(currentModalState);
  //워크스페이스 생성 모달 On
  const onClickCreateWorkspace = useCallback(() => {
    setCurrentModal("createWorkspace");
  }, []);

  return !userData ? (
    <Loading />
  ) : (
    <Workspaces>
      {userData.workspaces.map((workspace) => {
        const key = `workspace_link_${workspace.id}`;
        const link = `/workspace/${workspace.url}/channel/일반`;
        const logo = workspace.name.slice(0, 1).toUpperCase();
        return (
          <Link key={key} to={link}>
            <WorkspaceButton>{logo}</WorkspaceButton>
          </Link>
        );
      })}
      <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
    </Workspaces>
  );
};

export default WorkspaceSide;
