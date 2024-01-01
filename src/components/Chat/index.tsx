import { ChatWrapper } from "@components/Chat/styles";
import dayjs from "dayjs";
import gravatar from "gravatar";
import { FC, useMemo, memo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import regexifyString from "regexify-string";

interface Props {
  data: IDM | IChat;
}

// const BACK_URL = "http://localhost:3030";
const BACK_URL = "https://api.slack.sukwoo.kr/api";

const Chat: FC<Props> = memo(({ data }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
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
          <span>{dayjs(data.createdAt).format("h:mm A")}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
  return <></>;
});

export default Chat;
