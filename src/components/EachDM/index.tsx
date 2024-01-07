import { getFetcher } from "@utils/fetcher";
import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { DMLink, IsOnlineChecker } from "./styles";
import { dmState } from "@recoil/atom/channelType";
import useSocket from "@hooks/useSocket";
import { useParams } from "react-router-dom";
import lastReadState from "@recoil/atom/lastRead";

interface Props {
  member: IUser;
  isOnline: boolean;
}

const EachDM: FC<Props> = ({ member, isOnline }) => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();
  //스토리지용 키
  const storageKey = `dm-lastRead-${workspace}-${member.id}`;

  //recoil Data
  const dm = useRecoilValue(dmState);
  const [lastRead, setLastRead] = useRecoilState(lastReadState(storageKey));

  //hook
  const [socket] = useSocket(workspace);
  const [nowJoinedChannel, setNowJoinedChannel] = useState(true);

  //sever Data
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"), {
    refetchOnMount: false,
  });

  //sever Data
  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    ["dm-unread-cnt", workspace, member.id],
    async () => {
      if (!lastRead) {
        return;
      }
      const unReadCnt = await getFetcher(`/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${lastRead}`);
      return unReadCnt;
    },
    {
      enabled: !!lastRead,
    }
  );

  //안읽은 메시지가 있는가?
  const hasUnReadCnt = !nowJoinedChannel && unReadCnt !== undefined && unReadCnt > 0;

  const onDmMessage = useCallback(
    (data: IDM) => {
      if (!userData) {
        return;
      }
      if (
        (data.senderId === userData.id && data.receiverId === member.id) ||
        (data.senderId === member.id && data.receiverId === userData.id)
      ) {
        unReadCntRefetch();
      }
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

  //현재 접속중인 채널인지 확인
  useEffect(() => {
    setNowJoinedChannel(dm === member.id);
  }, [dm, member]);

  //LastRead 획득
  useEffect(() => {
    const localLastRead: number = +(localStorage.getItem(storageKey) || 1);
    setLastRead(Math.max(localLastRead, lastRead));
  }, [workspace, dm]);

  return (
    <DMLink key={member.id} to={`/workspace/${workspace}/dm/${member.id}`}>
      <IsOnlineChecker isOnline={isOnline} />
      <span>{member.nickname}</span>
      {member.id === userData?.id && <span> (나)</span>}
      {hasUnReadCnt ?? <span className="count">{unReadCnt}</span>}
    </DMLink>
  );
};

export default EachDM;
