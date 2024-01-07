import styled from "@emotion/styled";

export const Container = styled.div({
  display: "flex",
  flexWrap: "wrap",
  height: "100%",
  flexFlow: "column",
  position: "relative",
});

export const DragOver = styled.div({
  position: "absolute",
  top: "64px",
  left: "0",
  width: "100%",
  height: "calc(100% - 64px)",
  background: "white",
  opacity: "0.7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "40px",
  pointerEvents: "none",
});
