import { FC } from "react";
import { Channels, LoadWorkspaceName, MenuScroll, WorkspaceModal, WorkspaceName } from "./style";
import ChannelList from "@components/ChannelList";
import DMList from "@components/DMList";

const Loading: FC = () => {
  return (
    <Channels>
      <WorkspaceName>
        <LoadWorkspaceName />
      </WorkspaceName>
      <MenuScroll>
        <ChannelList />
        <DMList />
      </MenuScroll>
    </Channels>
  );
};

export default Loading;
