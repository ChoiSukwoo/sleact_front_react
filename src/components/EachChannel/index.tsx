import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";
import { FC, memo, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { ChannelLink } from "./styles";
import useSocket from "@hooks/useSocket";
import channelTypeState from "@recoil/atom/channelType";
import Laoding from "./loading";

interface Props {
  channel: IChannel;
}
const EachChannel: FC<Props> = ({ channel }) => {
  const workspace = useRecoilValue(workspaceState);
  const channelState = useRecoilValue(channelTypeState);
  const [socket] = useSocket(workspace);
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"), {
    refetchOnMount: false,
  });

  const { data: lastRead, refetch: lastReadRefetch } = useQuery<LastReadType>(
    [workspace, channel.name, "lastread"],
    () => getFetcher(`/api/users/workspace/${workspace}/channel/${channel.id}/lastread`),
    {
      enabled: userData !== undefined && workspace !== undefined,
    }
  );

  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    [workspace, channel.name, "unreads"],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${lastRead?.time}`),
    {
      enabled: lastRead !== undefined && workspace !== undefined,
    }
  );

  const onMessage = useCallback(
    (data: IChat) => {
      //현재 접속 채널이 아님
      if (channelState.type === "channel" && channelState.id === channel.id) {
        return;
      }
      //메시지를 전달받을ID와 채널ID랑 일치하지 않음
      if (data.channelId !== channel.id) {
        return;
      }
      unReadCntRefetch();
    },
    [channel, channelState]
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
    if (channelState.type === "channel" && channelState.id === channel.id) {
      lastReadRefetch();
    }
  }, [channelState, channel]);

  return (
    <ChannelLink key={channel.id} to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span># {channel.name}</span>
      {unReadCnt && unReadCnt > 0 ? <span className="count">{unReadCnt}</span> : <></>}
    </ChannelLink>
  );
};

export default memo(EachChannel);
