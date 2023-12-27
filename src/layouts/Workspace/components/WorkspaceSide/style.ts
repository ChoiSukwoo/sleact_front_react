import styled from "@emotion/styled";
import { Util } from "Styles";

export const Workspaces = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: "15px",
  width: "65px",
  alignItems: "center",
  background: "#3f0e40",
  borderTop: "1px solid rgb(82, 38, 83)",
  borderRight: "1px solid rgb(82, 38, 83)",
  paddingTop: "15px",
});

export const WorkspaceButton = styled.button({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  background: "white",
  fontSize: "18px",
  fontWeight: "700",
  color: "black",
  cursor: "pointer",
});

export const LodingButton = styled.div({
  ...Util.LoadingBg,
  width: "40px",
  height: "40px",
  borderRadius: "10px",
});

export const AddButton = styled.button({
  color: "white",
  fontSize: "24px",
  display: "inline-block",
  width: "40px",
  height: "40px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
});
