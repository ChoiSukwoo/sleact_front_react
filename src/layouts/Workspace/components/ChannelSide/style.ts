import styled from "@emotion/styled";
import { Util } from "Styles";

export const Channels = styled.nav({
  width: "260px",
  display: "inline-flex",
  flexDirection: "column",
  background: "#3f0e40",
  color: "rgb(188, 171, 188)",
  verticalAlign: "top",
  a: {
    paddingLeft: "46px",
    color: "inherit",
    textDecoration: "none",
    height: "28px",
    lineHeight: "28px",
    display: "flex",
    alignItems: "center",
    "&.selected": {
      color: "white",
    },
  },
  ".bold": {
    color: "white",
    fontWeight: "bold",
  },
  ".count": {
    marginLeft: "auto",
    background: "#cd2553",
    borderRadius: "16px",
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700",
    height: "18px",
    lineHeight: "18px",
    padding: "0 9px",
    color: "white",
    marginRight: "16px",
  },
  h2: {
    height: "36px",
    lineHeight: "36px",
    margin: 0,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: "15px",
  },
});

export const WorkspaceName = styled.button({
  height: "64px",
  lineHeight: "64px",
  width: "100%",
  border: "none",
  borderTop: "1px solid #522653",
  borderBottom: "1px solid #522653",
  fontWeight: "900",
  fontSize: "24px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  padding: "0 16px",
  margin: "0",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
});

export const LoadWorkspaceName = styled.div({
  ...Util.LoadingBg,
  height: "32px",
  width: "70%",
});

export const MenuScroll = styled.div({
  height: "calc(100vh - 102px)",
  overflowY: "auto",
});

export const WorkspaceModal = styled.div({
  padding: "10px 0 0",
  h2: {
    paddingLeft: "20px",
  },
  "> button": {
    width: "100%",
    height: "28px",
    padding: "4px",
    border: "none",
    background: "transparent",
    borderTop: "1px solid rgb(28, 29, 28)",
    cursor: "pointer",
    "&:last-of-type": {
      borderBottom: "1px solid rgb(28, 29, 28)",
    },
  },
});
