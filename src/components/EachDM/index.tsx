import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";
import { FC, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { DMLink, IsOnlineChecker } from "./styles";
import channelTypeState from "@recoil/atom/channelType";
import useSocket from "@hooks/useSocket";

interface Props {
  member: IUser;
  isOnline: boolean;
}

const EachDM: FC<Props> = ({ member, isOnline }) => {
  const workspace = useRecoilValue(workspaceState);
  const channelType = useRecoilValue(channelTypeState);
  const [socket] = useSocket(workspace);
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"), {
    refetchOnMount: false,
  });

  const { data: lastRead } = useQuery<LastReadType>(
    [workspace, member.id, "lastread"],
    () => getFetcher(`/api/users/workspace/${workspace}/dm/${member.id}/lastread`),
    {
      enabled: userData !== undefined && workspace !== undefined,
    }
  );

  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    [workspace, member.id, "unreads"],
    () => getFetcher(`/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${lastRead?.time}`),
    {
      enabled: lastRead !== undefined && workspace !== undefined,
    }
  );

  const onDmMessage = useCallback(
    (data: IDM) => {
      //현재 접속 Dm이 아님
      if (channelType.type === "dm" && channelType.id === member.id) {
        return;
      }
      //메시지를 전달받을ID와 채널ID랑 일치하지 않음
      if (data.senderId !== member.id) {
        return;
      }
      unReadCntRefetch();
    },
    [member]
  );

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("dm", onDmMessage);
    return () => {
      socket.off("dm", onDmMessage);
    };
  }, [socket, onDmMessage]);

  return (
    <DMLink key={member.id} to={`/workspace/${workspace}/dm/${member.id}`}>
      <IsOnlineChecker isOnline={isOnline} />
      <span>{member.nickname}</span>
      {member.id === userData?.id && <span> (나)</span>}
      {unReadCnt && unReadCnt > 0 ? <span className="count">{unReadCnt}</span> : <></>}
    </DMLink>
  );
};

export default EachDM;
