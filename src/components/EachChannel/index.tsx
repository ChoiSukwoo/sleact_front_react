import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";
import { FC, memo, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { ChannelLink } from "./styles";
import useSocket from "@hooks/useSocket";
import channelTypeState from "@recoil/atom/channelType";

interface Props {
  channel: IChannel;
}
const EachChannel: FC<Props> = ({ channel }) => {
  const workspace = useRecoilValue(workspaceState);
  const channelState = useRecoilValue(channelTypeState);
  const [socket] = useSocket(workspace);

  //현재 접속중인 채널인가?
  const nowJoinedChannel = channelState.type === "channel" && channelState.id === channel.name;

  const { data: lastRead, refetch: refetchLastRead } = useQuery<LastReadType>(
    [workspace, channel.name, "unreads"],
    async () => {
      const storageKey = `workspace-lastRead-${workspace}-${channel.id}`;
      const localLastRead = localStorage.getItem(storageKey);
      if (localLastRead) {
        return {
          time: localLastRead,
        };
      }
      return await getFetcher(`/api/users/workspace/${workspace}/channel/${channel.id}/lastread`);
    },
    {
      enabled: !!workspace && !!channel.id && !nowJoinedChannel,
    }
  );

  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    [workspace, channel.name, "unreads"],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${lastRead?.time}`),
    {
      enabled: !!workspace && !!channel.name && lastRead !== undefined && !nowJoinedChannel,
    }
  );

  //안읽은 메시지가 있는가?
  const hasUnReadCnt = !nowJoinedChannel && unReadCnt !== undefined && unReadCnt > 0;

  const onMessage = useCallback(
    (data: IChat) => {
      //채널에 접속중이 아닐떄
      // 현재 접속중인 채널일시 이벤트 실행하지 않음
      //메시지를 전달받을ID와 채널ID랑 일치하지 않음
      if (channelState.type !== "channel" || nowJoinedChannel || data.channelId !== channel.id) {
        return;
      }
      unReadCntRefetch();
    },
    [channelState, nowJoinedChannel, channel]
  );

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", onMessage);
    return () => {
      socket.off("message", onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    refetchLastRead();
  }, [workspace, channelState]);

  useEffect(() => {
    unReadCntRefetch();
  }, [lastRead]);

  return (
    <ChannelLink key={channel.id} to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span># {channel.name}</span>
      {hasUnReadCnt ?? <span className="count">{unReadCnt}</span>}
    </ChannelLink>
  );
};

export default memo(EachChannel);
