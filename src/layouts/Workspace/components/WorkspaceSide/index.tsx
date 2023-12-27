import { useQuery } from "react-query";
import { AddButton, WorkspaceButton, Workspaces } from "./style";
import { getFetcher } from "@utils/fetcher";
import { FC } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

interface Props {
  onClickCreateWorkspace: () => void;
}

export const WorkspaceSide: FC<Props> = ({ onClickCreateWorkspace }) => {
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));

  return userData === undefined ? (
    <Loading />
  ) : (
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
  );
};

export default WorkspaceSide;
