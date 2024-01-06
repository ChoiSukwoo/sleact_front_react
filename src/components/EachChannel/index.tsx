import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChannelLink } from "./styles";
import useSocket from "@hooks/useSocket";
import { channelState } from "@recoil/atom/channelType";
import lastReadState from "@recoil/atom/lastRead";

interface Props {
  channelData: IChannel;
}
const EachChannel: FC<Props> = ({ channelData }) => {
  const workspace = useRecoilValue(workspaceState);
  const channel = useRecoilValue(channelState);
  const [socket] = useSocket(workspace);

  //현재 접속중인 채널인가?
  const [nowJoinedChannel, setNowJoinedChannel] = useState(true);
  const storageKey = `channel-lastRead-${workspace}-${channel}`;

  console.log("EachChannel ", channelData.name, " Key : ", storageKey);

  const [lastRead, setLastRead] = useRecoilState(lastReadState(storageKey));

  const { data: unReadCnt, refetch: unReadCntRefetch } = useQuery<number>(
    [workspace, channelData.id, "unreads"],
    async () => {
      if (!lastRead || nowJoinedChannel || !channelData || !workspace) {
        return;
      }
      const unReadCnt = await getFetcher(
        `/api/workspaces/${workspace}/channels/${channelData.name}/unreads?after=${lastRead}`
      );
      return unReadCnt;
    }
  );

  //안읽은 메시지가 있는가?
  const hasUnReadCnt = !nowJoinedChannel && unReadCnt !== undefined && unReadCnt > 0;

  const onMessage = useCallback(
    (data: IChat) => {
      if (data.channelId === channelData.id) {
        unReadCntRefetch();
      }
    },
    [channelData]
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

  //현재 접속중인 채널인지 확인
  useEffect(() => {
    const nowJoined = !!(channel && channel === channelData.name);
    setNowJoinedChannel(nowJoined);
  }, [channel, channelData]);

  //LastRead 획득
  useEffect(() => {
    const getLastRead = async () => {
      if (!workspace || !channelData.id) {
        console.log("Fail Load LastRead \n workspace: ", workspace, "\n channel.id: ", channelData.id);
        return;
      }
      const localLastRead: number = +(localStorage.getItem(storageKey) || 0);
      const serverLastRead: number =
        +(await getFetcher(`/api/users/workspace/${workspace}/channel/${channelData.id}/lastread`))?.time ?? 0;
      setLastRead(Math.max(localLastRead, serverLastRead, lastRead));
    };

    getLastRead();
  }, [workspace, channelData]);

  //LastRead 변동에 따른 UnReadCnt 획득
  useEffect(() => {
    if (lastRead || !nowJoinedChannel) {
      unReadCntRefetch();
    }
  }, [lastRead, nowJoinedChannel]);

  return (
    <ChannelLink key={channelData.id} to={`/workspace/${workspace}/channel/${channelData.name}`}>
      <span># {channelData.name}</span>
      {hasUnReadCnt ?? <span className="count">{unReadCnt}</span>}
    </ChannelLink>
  );
};

export default memo(EachChannel);
