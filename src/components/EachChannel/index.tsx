import { getFetcher } from "@utils/fetcher";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChannelLink } from "./styles";
import useSocket from "@hooks/useSocket";
import { channelState } from "@recoil/atom/channelType";
import lastReadState from "@recoil/atom/lastRead";
import { useParams } from "react-router-dom";

interface Props {
  channelData: IChannel;
}
const EachChannel: FC<Props> = ({ channelData }) => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();

  //recoil Data
  const channel = useRecoilValue(channelState);

  //hook
  const [socket] = useSocket(workspace);

  //스토리지용 키
  const storageKey = `channel-lastRead-${workspace}-${channelData.id}`;
  //현재 접속중인 채널인가?
  const [nowJoinedChannel, setNowJoinedChannel] = useState(true);
  const [lastRead, setLastRead] = useRecoilState(lastReadState(storageKey));

  //sever Data
  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    ["channel-unread-cnt", workspace, channelData.id],
    async () => {
      if (!lastRead) {
        return;
      }
      const unReadCnt = await getFetcher(
        `/api/workspaces/${workspace}/channels/${channelData.name}/unreads?after=${lastRead}`
      );
      return unReadCnt;
    },
    {
      enabled: !!lastRead,
    }
  );

  //안읽은 메시지가 있는가?
  const hasUnReadCnt = !nowJoinedChannel && unReadCnt !== undefined && unReadCnt > 0;

  //메시지 수신시 unReadRefetch
  const onMessage = useCallback(
    (data: IChat) => data.channelId === channelData.id && unReadCntRefetch(),
    [channelData]
  );

  //소켓연결
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", onMessage);
    return () => {
      socket.off("message", onMessage);
    };
  }, [socket, onMessage]);

  //현재 접속중인 채널인지 확인
  useEffect(() => {
    setNowJoinedChannel(channel === channelData.name);
  }, [channel, channelData]);

  //LastRead 획득
  useEffect(() => {
    const localLastRead: number = +(localStorage.getItem(storageKey) || 1);
    setLastRead(Math.max(localLastRead, lastRead));
  }, [workspace, channelData]);

  return (
    <ChannelLink key={channelData.id} to={`/workspace/${workspace}/channel/${channelData.name}`}>
      <span># {channelData.name}</span>
      {hasUnReadCnt ?? <span className="count">{unReadCnt}</span>}
    </ChannelLink>
  );
};

export default memo(EachChannel);
