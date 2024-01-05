import EachChannel from "@components/EachChannel";
import { getFetcher } from "@utils/fetcher";
import { FC, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { CollapseButton, TitleCover } from "./styles";
import { useRecoilValue } from "recoil";
import workspaceState from "@recoil/atom/workspace";

import CollapseIcon from "@svg/expand.svg?react";
import Loading from "./loading";

interface Props {}

const ChannelList: FC<Props> = () => {
  const workspace = useRecoilValue(workspaceState);
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const { data: channelData } = useQuery<IChannel[], Error>(
    [workspace, "channels"],
    () => getFetcher(`/api/workspaces/${workspace}/channels`),
    {
      enabled: userData !== undefined,
    }
  );

  const [isDown, setIsDown] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setIsDown((prev) => !prev);
  }, []);

  return !channelData ? (
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
          channelData?.map((channel) => {
            return <EachChannel key={`each_channel_${channel.id}`} channel={channel} />;
          })}
      </div>
    </>
  );
};

export default ChannelList;
