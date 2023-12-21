import styled from "@emotion/styled";
import { Util } from "Styles";

export const BackgroundStyle = styled.div({
  position: "fixed",
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
  zIndex: "var(--index--modalCover)",
});

export const ModalStyle = styled.div({
  position: "relative",
  transform: "translate(-50%, -50%)", // 정확한 중앙 정렬을 위해 변형
  left: "50%", // 뷰포트의 가로 중앙에 위치
  top: "50%", // 뷰포트의 세로 중앙에 위치
  width: "fit-content",
  background: "white",
  boxShadow: "0 0 0 1px rgba(29,28,29,0.13), 0 4px 12px 0 rgba(0, 0, 0, 0.12)",
  backgroundColor: "rgba(248, 248, 248, 1)",
  borderRadius: "6px",
  userSelect: "none",
  padding: "30px 40px",
  zIndex: "var(--index--modalContent)",
});

export const CloseModalButton = styled.button({
  ...Util.ButtonStyleRemove,
  position: "absolute",
  right: "10px",
  top: "10px",
});
