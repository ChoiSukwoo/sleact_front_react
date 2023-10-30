import { CollapseButton } from "@components/DMList/styles";
import EachChannel from "@components/EachChannel";
import fetcher from "@utils/fetcher";
import { FC, useCallback, useState } from "react";
import { useParams } from "react-router";
// import useSWR from "swr";
import { CollapseTriangle } from "./styles";
interface Props {
  channelData?: IChannel[];
  userData?: IUser;
}

const ChannelList: FC<Props> = () => {
  // const { workspace } = useParams<{ workspace?: string }>();
  // const [channelCollapse, setChannelCollapse] = useState(false);
  // const { data: userData } = useSWR<IUser>("/api/users", fetcher, {
  //   dedupingInterval: 2000, // 2초
  // });
  // const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
  // const toggleChannelCollapse = useCallback(() => {
  //   setChannelCollapse((prev) => !prev);
  // }, []);
  // return (
  //   <>
  //     <h2>
  //       <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
  //         <CollapseTriangle isDown={!channelCollapse} />
  //       </CollapseButton>
  //       <span>Channels</span>
  //     </h2>
  //     <div>
  //       {!channelCollapse &&
  //         channelData?.map((channel) => {
  //           return <EachChannel key={channel.id} channel={channel} />;
  //         })}
  //     </div>
  //   </>
  // );
  return <></>;
};

export default ChannelList;
