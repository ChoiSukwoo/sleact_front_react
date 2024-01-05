import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { ChannelLink } from "./styles";
import useSocket from "@hooks/useSocket";
import channelTypeState from "@recoil/atom/channelType";

interface Props {
  channelData: IChannel;
}
const EachChannel: FC<Props> = ({ channelData }) => {
  const workspace = useRecoilValue(workspaceState);
  const channel = useRecoilValue(channelState);
  const [socket] = useSocket(workspace);

  //현재 접속중인 채널인가?
  const [nowJoinedChannel, setNowJoinedChannel] = useState(true);

  const { data: lastRead, refetch: refetchLastRead } = useQuery<LastReadType>(
    [workspace, channel.id, "unreads"],
    async () => {
      if (!workspace || !channel.id || nowJoinedChannel) {
        return undefined;
      }
      const storageKey = `workspace-lastRead-${workspace}-${channel.id}`;
      const localLastRead = localStorage.getItem(storageKey);
      if (localLastRead) {
        return {
          time: localLastRead,
        };
      }
      const serverLastRead = await getFetcher(`/api/users/workspace/${workspace}/channel/${channel.id}/lastread`);
      return serverLastRead;
    },
    {
      enabled: !!workspace && !!channel.id && !nowJoinedChannel,
    }
  );

  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    [workspace, channel.name, "unreads"],
    async () => {
      if (!lastRead || nowJoinedChannel) {
        return;
      }
      const unReadCnt = await getFetcher(
        `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${lastRead?.time}`
      );
      return unReadCnt;
    },
    {
      enabled: !!workspace && !!channel.name && lastRead !== undefined && !nowJoinedChannel,
    }
  );

  //안읽은 메시지가 있는가?
  const hasUnReadCnt = !nowJoinedChannel && unReadCnt !== undefined && unReadCnt > 0;

  const onMessage = useCallback(
    (data: IChat) => {
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
    if (!!workspace && !!channel.id && !nowJoinedChannel) {
      refetchLastRead();
    }
  }, [workspace, channelState]);

  useEffect(() => {
    if (lastRead || !nowJoinedChannel) {
      unReadCntRefetch();
    }
  }, [lastRead]);

  useEffect(() => {
    const nowJoined = channelState.type === "channel" && channelState.id === channel.name;
    setNowJoinedChannel(nowJoined);
  }, [channelState, channel]);

  return (
    <ChannelLink key={channel.id} to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span># {channel.name}</span>
      {hasUnReadCnt ?? <span className="count">{unReadCnt}</span>}
    </ChannelLink>
  );
};

export default memo(EachChannel);
