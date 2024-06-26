import EachDM from "@components/EachDM";
import { getFetcher } from "@utils/fetcher";
import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CollapseButton, TitleCover } from "./styles";
import useSocket from "@hooks/useSocket";

import CollapseIcon from "@svg/expand.svg?react";
import Loading from "./loading";
import { useParams } from "react-router-dom";

interface Props {
  DMData?: IDM[];
  userData?: IUser;
}

const DMList: FC<Props> = () => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();
  //sever Data
  const { data: memberData } = useQuery<IUser[], Error>(
    [workspace, "members"],
    () => getFetcher(`/api/workspaces/${workspace}/members`),
    {
      enabled: workspace !== undefined,
      refetchOnMount: "always",
    }
  );
  const [socket] = useSocket(workspace);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [isDown, setIsDown] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setIsDown((prev) => !prev);
  }, []);

  useEffect(() => {
    setOnlineList([]);
  }, [workspace]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("onlineList", (data: number[]) => {
      setOnlineList(data);
    });
    return () => {
      socket.off("onlineList");
    };
  }, [socket]);

  return !memberData ? (
    <Loading />
  ) : (
    <>
      <TitleCover onClick={toggleChannelCollapse}>
        <CollapseButton isDown={isDown} style={{ marginRight: "5px" }}>
          <CollapseIcon style={{ flexShrink: 0 }} />
        </CollapseButton>
        <h2>Direct Messages</h2>
      </TitleCover>

      <div>
        {!isDown &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            const key = `each_dm_user_${member.id}`;
            return <EachDM key={key} member={member} isOnline={isOnline} />;
          })}
      </div>
    </>
  );
};

export default DMList;
