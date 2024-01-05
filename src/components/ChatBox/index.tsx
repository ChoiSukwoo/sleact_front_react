import autosize from "autosize";
import { ChangeEventHandler, FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";

import TextareaBox from "@components/MentionTextareaBox";

import { ChatArea, Form, SendButton, Toolbox } from "@components/ChatBox/styles";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import SendMessageIcon from "@svg/sendMessage.svg?react";
import ImgUploadIcon from "@svg/img_upload.svg?react";
import { useRecoilValue } from "recoil";
import channelTypeState from "@recoil/atom/channelType";

interface ChatForm {
  chat: string;
}

interface Props {
  onSubmitForm: (chat: string) => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

const ChatBox: FC<Props> = ({ onSubmitForm, handleFileChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const channel = useRecoilValue(channelTypeState);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const method = useForm<ChatForm>({
    defaultValues: {
      chat: "",
    },
  });

  const validationRules: IFormRules<ChatForm> = {
    chat: {
      required: true,
      maxLength: {
        value: 1000,
        message: "1000 이상 입력할수 없습니다.",
      },
    },
  };

  const onSubmit = useCallback<SubmitHandler<ChatForm>>(
    async (data) => {
      onSubmitForm(data.chat);
      method.reset();
    },
    [method, onSubmitForm]
  );

  const onError = useCallback<SubmitErrorHandler<ChatForm>>((error) => {
    console.log(error);
  }, []);

  const handleClick = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    if (!fileInputRef || !fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  }, []);

  return (
    <FormProvider {...method}>
      <ChatArea>
        <Form onSubmit={method.handleSubmit(onSubmit, onError)}>
          <TextareaBox
            onSubmitForm={method.handleSubmit(onSubmit, onError)}
            name={"chat"}
            rule={validationRules.chat}
            placeholder={`Message #${channel.type === "channel" && channel.id}`}
            maxLength={1000}
          />
          <Toolbox>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <SendButton onClick={handleClick}>
                <ImgUploadIcon />
              </SendButton>
            </div>
            <SendButton type="submit" disabled={!method.watch("chat").trim()}>
              <SendMessageIcon />
            </SendButton>
          </Toolbox>
        </Form>
      </ChatArea>
    </FormProvider>
  );
};

export default ChatBox;
