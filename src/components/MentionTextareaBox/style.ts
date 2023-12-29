import styled from "@emotion/styled";
import { MentionsInput } from "react-mentions";

interface EachMentionProps {
  focus: boolean;
}

export const MentionsTextarea = styled(MentionsInput)({
  fontSize: "15px",
  lineHeight: "22px",
  padding: "8px 9px",
  wordBreak: "break-all",

  "& strong": {
    background: "skyblue",
  },

  "& textarea": {
    height: "100% !important",
    padding: "9px 10px !important",
    outline: "none !important",
    borderRadius: "4px !important",
    resize: "none",
    lineHeight: "22px",
    border: "none",
    wordBreak: "break-all",
  },

  "& ul": {
    border: "1px solid lightgray",
    maxHeight: "200px",
    overflowY: "auto",
    padding: "9px 10px",
    background: "white",
    borderRadius: "4px",
    width: "150px",
  },
});

export const EachMention = styled.button<EachMentionProps>(({ focus }) => ({
  padding: "4px 20px",
  background: "transparent",
  border: "none",
  display: "flex",
  alignItems: "center",
  color: "rgb(28, 29, 28)",
  width: "100%",

  "& img": {
    marginRight: "5px",
  },

  ...(focus && {
    background: "#1264a3",
    color: "white",
  }),
}));
