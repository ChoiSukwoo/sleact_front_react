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
