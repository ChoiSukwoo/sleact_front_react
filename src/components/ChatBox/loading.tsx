import { FC, MouseEventHandler, useCallback } from "react";

import TextareaBox from "@components/MentionTextareaBox/loading";

import { ChatArea, Form, SendButton, Toolbox } from "@components/ChatBox/styles";

import SendMessageIcon from "@svg/sendMessage.svg?react";
import ImgUploadIcon from "@svg/img_upload.svg?react";

const Loading: FC = () => {
  const eventPrevent = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
  }, []);

  return (
    <ChatArea>
      <Form>
        <TextareaBox placeholder={`Message #`} />
        <Toolbox>
          <div>
            <SendButton onClick={eventPrevent}>
              <ImgUploadIcon />
            </SendButton>
          </div>
          <SendButton disabled onClick={eventPrevent}>
            <SendMessageIcon />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default Loading;
