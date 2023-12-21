import styled from "@emotion/styled";

export const InputText = styled.input({
  borderRadius: "4px",
  border: "1px solid rgba( 134, 134, 134, 1)",
  transition: "border 80ms ease-out, box-shadow 80ms ease-out",
  width: "100%",
  color: "rgba( 29, 28, 29, 1)",
  backgroundColor: "rgba( 255, 255, 255, 1)",
  padding: "11px 12px 13px 11px",
  height: "44px",
  fontSize: "18px",
  lineHeight: "1.33333333",
  "&:focus": {
    "--saf-0": "rgba( 18, 100, 163, 1)",
    boxShadow: "0 0 0 1px rgba( 134, 134, 134, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)",
  },
});
