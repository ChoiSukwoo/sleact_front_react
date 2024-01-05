import { ChatImg, ChatResultLoading, ChatText, ChatUserLoading, ChatWrapper } from "./styles";
import gravatar from "gravatar";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <ChatWrapper>
      <ChatImg>
        <img src={gravatar.url("", { s: "36px", d: "retro" })} alt={"userNicknameLoading"} />
      </ChatImg>
      <ChatText>
        <ChatUserLoading />
        <ChatResultLoading />
      </ChatText>
    </ChatWrapper>
  );
};

export default Loading;
