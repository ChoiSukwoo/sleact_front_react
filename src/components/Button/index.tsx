import styled from "@emotion/styled";

export const Button = styled.button({
  width: "100%",
  color: "#fff",
  backgroundColor: "#4a154b",
  border: "none",
  fontSize: "18px",
  fontWeight: 900,
  height: "44px",
  minWidth: "96px",
  padding: "0 16px 3px",
  transition: "all 80ms linear",
  userSelect: "none",
  outline: "none",
  cursor: "pointer",
  borderRadius: "4px",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
  "&:hover": {
    backgroundColor: "rgba(74, 21, 75, 0.9)",
    border: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 1px  rgba( 18, 100, 163, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)",
  },
});
