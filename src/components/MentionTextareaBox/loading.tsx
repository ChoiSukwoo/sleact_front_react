import { FC } from "react";
import { MentionsTextareaLoading } from "./style";

interface Props {
  placeholder?: string;
}

const Loading: FC<Props> = ({ placeholder }) => {
  return <MentionsTextareaLoading readOnly placeholder={placeholder} />;
};

export default Loading;
