import Chat from "@components/Chat/loading";
import { ChatZoneLoading } from "./styles";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <ChatZoneLoading>
      {[...Array(10)].map((_, index) => {
        return <Chat key={`chat_load_${index}`} />;
      })}
    </ChatZoneLoading>
  );
};

export default Loading;
