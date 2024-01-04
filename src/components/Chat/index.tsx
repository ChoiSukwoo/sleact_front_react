import { ChatWrapper } from "@components/Chat/styles";
import workspaceState from "@recoil/atom/workspace";
import dayjs from "dayjs";
import gravatar from "gravatar";
import { FC, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import regexifyString from "regexify-string";

interface Props {
  data: IDM | IChat;
}

// const BACK_URL = "http://localhost:3030";
const BACK_URL = import.meta.env.MODE === "production" ? "https://api.slack.sukwoo.kr" : "http://localhost:3030";

const Chat: FC<Props> = memo(({ data }) => {
  const workspace = useRecoilValue(workspaceState);
  const user: IUser = "sender" in data ? data.sender : data.user;
  const result = useMemo<(string | JSX.Element)[] | JSX.Element>(
    () =>
      data.content.startsWith("uploads\\") ? (
        <img src={`${BACK_URL}/${data.content}`} style={{ maxHeight: 200 }} alt={"이미지"} />
      ) : (
        regexifyString({
          input: data?.content,
          pattern: /@\[(.+?)\]\((\d+?\))|\n/g,
          decorator(match, index) {
            const arr: string[] | null = match.match(/@\[(.+?)\]\((\d+?)\)/)!;
            if (arr) {
              return (
                <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                  @{arr[1]}
                </Link>
              );
            }
            return <br key={index} />;
          },
        })
      ),
    [data?.content, workspace]
  );

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: "36px", d: "retro" })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{data.id === 0 ? "Sending" : dayjs(data.createdAt).format("h:mm A")}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
