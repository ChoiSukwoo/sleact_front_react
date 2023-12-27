import styled from "@emotion/styled";

export const MenuBackground = styled.div({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: "var(--index--modalCover)",
});

export const MenuContent = styled.div({
  position: "absolute",
  top: "100%",
  display: "inline-block",
  boxShadow: "0 0 0 1px rgba(29, 28, 29, 0.13), 0 4px 12px 0 rgba(0, 0, 0, 0.12)",
  backgroundColor: "rgba( 248, 248, 248, 1)",
  borderRadius: "6px",
  userSelect: "none",
  minWidth: "360px",
  zIndex: "var(--index--modalContent)",
  maxHeight: "calc(100vh - 20px)",
  color: "rgb(29, 28, 29)",
});

export const CloseModalButton = styled.button({
  position: "absolute",
  right: "10px",
  top: "6px",
  background: "transparent",
  border: "none",
  fontSize: "30px",
  cursor: "pointer",
});
