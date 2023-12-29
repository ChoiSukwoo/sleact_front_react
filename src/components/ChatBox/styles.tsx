import styled from "@emotion/styled";
import { Util } from "Styles";

interface SendProps {
  isEnable: boolean;
}

export const ChatArea = styled.div({
  display: "flex",
  width: "100%",
  padding: "20px",
  paddingTop: "0",
});

export const Form = styled.form({
  color: "rgb(29, 28, 29)",
  fontSize: "15px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid rgb(29, 28, 29)",
});

export const Toolbox = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  height: "41px",
  background: "rgb(248, 248, 248)",
  borderTop: "1px solid rgb(221, 221, 221)",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
});

export const SendButton = styled.button({
  ...Util.ButtonStyleRemove,
  ...Util.FlexCenter,
  width: "36px",
  height: "28px",
  borderRadius: "3px",
  marginRight: "10px",

  backgroundColor: "#148567",
  color: "#ffffff",

  "&:disabled": {
    backgroundColor: "#f8f8f8",
    color: "#57595c",
  },
});

export const SendTriangle = styled.div<SendProps>(({ isEnable }) => ({
  width: "0",
  height: "0",
  borderLeft: "12px solid transparent",
  borderRight: "12px solid transparent",
  borderTop: `24px solid ${isEnable ? "green" : "gray"}`,
  transform: "rotate(270deg)",
}));
