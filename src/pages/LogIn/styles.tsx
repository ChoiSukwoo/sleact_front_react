import styled from "@emotion/styled";
import { Font, Util } from "Styles";

export const Header = styled.header({
  ...Font.h1,
  textAlign: "center",
  marginTop: "50px",
  marginBottom: "50px",
});

export const Form = styled.form({
  margin: "0 auto",
  width: "400px",
  maxWidth: "400px",
});

export const Label = styled.label({
  marginBottom: "16px",
  "> h6": {
    textAlign: "left",
    paddingBottom: "8px",
    cursor: "pointer",
  },
});

export const Input = styled.input({
  borderRadius: "4px",
  border: "1px solid rgba( 134, 134, 134 , 1)",
  transition: "border 80ms ease-out, box-shadow 80ms ease-out",
  boxSizing: "border-box",
  margin: "0 0 20px",
  width: "100%",
  color: "rgba(29, 28, 29, 1)",
  backgroundColor: "white",
  padding: "12px",
  height: "44px",
  paddingTop: "11px",
  paddingBottom: "13px",
  fontSize: "18px",
  lineHeight: "1.33333333",
  "&:focus": {
    boxShadow: "0 0 0 1px rgba( 18, 100, 163, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)",
  },
});

export const Error = styled.div({
  ...Util.Error,
  marginBottom: "16px",
});

export const LinkContainer = styled.p({
  fontSize: "13px",
  color: "#616061",
  margin: "0 auto 8px",
  width: "400px",
  maxWidth: "400px",
  a: {
    color: "#1264a3",
    textDecoration: "none",
    fontWeight: 700,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
