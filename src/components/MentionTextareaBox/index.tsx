import React, { FC, KeyboardEventHandler, useCallback, useEffect, useRef } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Mention, SuggestionDataItem } from "react-mentions";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import gravatar from "gravatar";
import autosize from "autosize";

import channelTypeState from "@recoil/atom/channelType";
import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";

import { EachMention, MentionsTextarea } from "./style";

interface Props {
  onSubmitForm: (e: any) => void;
  name: string;
  rule?: RegisterOptions;
  placeholder?: string;
  maxLength?: number;
}
const TextareaBox: FC<Props> = ({ name, rule, onSubmitForm, placeholder, maxLength }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const workspace = useRecoilValue(workspaceState);
  const channel = useRecoilValue(channelTypeState);
  const { control } = useFormContext();

  const { data: channelMembers } = useQuery<IUser[]>(
    ["channelMembers", workspace, channel],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel.id}/members`),
    {
      enabled: workspace !== undefined && channel !== undefined && channel.type === "channel",
    }
  );

  const onKeydownChat = useCallback<KeyboardEventHandler>(
    (e) => {
      if (!e.nativeEvent.isComposing && e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm]
  );

  const renderUserSuggestion: (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean
  ) => React.ReactNode = useCallback(
    (member, search, highlightedDisplay, index, focus) => {
      if (!channelMembers) {
        return null;
      }
      return (
        <EachMention focus={focus}>
          <img
            src={gravatar.url(channelMembers[index].email, { s: "20px", d: "retro" })}
            alt={channelMembers[index].nickname}
          />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [channelMembers]
  );

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={rule}
      render={({ field }) => {
        const handleOnChange = (event: any, newValue: string) => {
          let value = newValue;
          if (maxLength && value.length > maxLength) {
            value = value.slice(0, maxLength); // 값 자르기
          }
          field.onChange(value); // 변경된 값을 전달
        };

        return (
          <MentionsTextarea
            id="editor-chat"
            {...field}
            onChange={handleOnChange}
            onKeyDown={onKeydownChat}
            placeholder={placeholder}
            inputRef={textareaRef}
            forceSuggestionsAboveCursor
          >
            <Mention
              appendSpaceOnAdd
              trigger="@"
              data={channelMembers?.map((v) => ({ id: v.id, display: v.nickname })) || []}
              renderSuggestion={renderUserSuggestion}
            />
          </MentionsTextarea>
        );
      }}
    />
  );
};

export default TextareaBox;
