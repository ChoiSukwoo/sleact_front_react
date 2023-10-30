import fetcher from "@utils/fetcher";
import { useEffect, VFC } from "react";
import { useParams } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
// import useSWR from 'swr';

import styled from "@emotion/styled";

const IsOnlineChecker = styled.div<{ isOnline: boolean }>(({ isOnline }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  marginRight: "5px",
  ...(isOnline
    ? {
        backgroundColor: "green",
      }
    : {
        border: "3px solid",
        borderColor: "gray",
      }),
}));

interface Props {
  member: IUser;
  isOnline: boolean;
}
const EachDM: VFC<Props> = ({ member, isOnline }) => {
  // const { workspace } = useParams<{ workspace?: string }>();
  // const location = useLocation();
  // const { data: userData } = useSWR<IUser>("/api/users", fetcher, {
  //   dedupingInterval: 2000, // 2초
  // });
  // const date = localStorage.getItem(`${workspace}-${member.id}`) || 0;
  // const { data: count, mutate } = useSWR<number>(userData ? `/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${date}` : null, fetcher);
  // useEffect(() => {
  //   if (location.pathname === `/workspace/${workspace}/dm/${member.id}`) {
  //     mutate(0);
  //   }
  // }, [mutate, location.pathname, workspace, member]);
  // return (
  //   <NavLink key={member.id} to={`/workspace/${workspace}/dm/${member.id}`} className={({ isActive }) => (isActive ? "selected" : "")}>
  //     <IsOnlineChecker isOnline={isOnline} />
  //     <span className={count && count > 0 ? "bold" : undefined}>{member.nickname}</span>
  //     {member.id === userData?.id && <span> (나)</span>}
  //     {(count && count > 0 && <span className="count">{count}</span>) || null}
  //   </NavLink>
  // );
  return <></>;
};

export default EachDM;
