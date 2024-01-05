import styled from "@emotion/styled";
import { Util } from "Styles";

export const ChatWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  padding: "8px 20px",
  "&:hover": {
    background: "#eee",
  },
});

export const ChatImg = styled.div({
  display: "flex",
  width: "44px",
  marginRight: "8px",
  "& img": {
    width: "44px",
    height: "44px",
  },
});

export const ChatText = styled.div({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const ChatUser = styled.p({
  width: "100%",
  height: "22px",
});

export const ChatUserLoading = styled.div({
  ...Util.LoadingBg,
  width: "130px",
  height: "18px",
  marginBottom: "4px",
});

export const ChatUserNm = styled.b({
  marginRight: "5px",
});

export const ChatSendTime = styled.span({
  fontSize: "12px",
});

export const ChatResult = styled.p({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export const ChatResultLoading = styled.div({
  ...Util.LoadingBg,
  width: "210px",
  height: "22px",
});
