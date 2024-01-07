import EachChannel from "@components/EachChannel";
import { getFetcher } from "@utils/fetcher";
import { FC, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { CollapseButton, TitleCover } from "./styles";
import CollapseIcon from "@svg/expand.svg?react";
import Loading from "./loading";
import { useParams } from "react-router-dom";

interface Props {}

const ChannelList: FC<Props> = () => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();
  //sever Data
  const { data: channelList } = useQuery<IChannel[], Error>(
    ["channelList", workspace],
    () => getFetcher(`/api/workspaces/${workspace}/channels`),
    {
      enabled: !!workspace,
      refetchOnMount: "always",
    }
  );

  const [isDown, setIsDown] = useState(false);

  //채널리스트 확장 상태 변경
  const toggleChannelCollapse = useCallback(() => {
    setIsDown((prev) => !prev);
  }, []);

  return !channelList ? (
    <Loading />
  ) : (
    <>
      <TitleCover onClick={toggleChannelCollapse}>
        <CollapseButton isDown={isDown} style={{ marginRight: "5px" }}>
          <CollapseIcon style={{ flexShrink: 0 }} />
        </CollapseButton>
        <h2>Channels</h2>
      </TitleCover>
      <div>
        {!isDown &&
          channelList.map((channel) => {
            const key = `each_channel_${channel.id}`;
            return <EachChannel key={key} channelData={channel} />;
          })}
      </div>
    </>
  );
};

export default ChannelList;
