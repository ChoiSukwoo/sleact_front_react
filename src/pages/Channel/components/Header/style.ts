import styled from "@emotion/styled";
import { Util } from "Styles";

export const HeaderStyles = styled.header({
  display: "flex",
  justifyContent: "center",
  height: "64px",
  width: "100%",
  boxShadow: "0 1px 0 rgba(29, 28, 29, 0.13)",
  padding: "5px 16px 5px 20px",
  fontWeight: "bold",
  alignItems: "center",
});

export const InviteButton = styled.button({
  ...Util.ButtonStyleRemove,
  ...Util.FlexCenter,
  width: "35px",
  height: "35px",
  backgroundColor: "#f0f0f0",
  border: "1px solid #dcdcdc",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
});
