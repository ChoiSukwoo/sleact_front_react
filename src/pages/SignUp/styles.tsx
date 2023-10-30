import styled from "@emotion/styled";

export const Header = styled.header({
  textAlign: "center",
  fontFamily: `
    Slack-Larsseit,
    Helvetica Neue,
    Helvetica,
    Segoe UI,
    Tahoma,
    Arial,
    sans-serif`,
  fontWeight: 700,
  fontSize: "48px",
  lineHeight: "46px",
  letterSpacing: "-0.75px",
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
  "> span": {
    display: "block",
    textAlign: "left",
    paddingBottom: "8px",
    fontSize: "15px",
    cursor: "pointer",
    lineHeight: "1.46666667",
    fontWeight: 700,
  },
});

export const Input = styled.input({
  borderRadius: "4px",
  border: "1px solid rgba( 134, 134, 134, 1)",
  transition: "border 80ms ease-out, box-shadow 80ms ease-out",
  boxSizing: "border-box",
  margin: "0 0 20px",
  width: "100%",
  color: "rgba( 29, 28, 29, 1)",
  backgroundColor: "rgba( 255, 255, 255, 1)",
  padding: "12px",
  height: "44px",
  paddingTop: "11px",
  paddingBottom: "13px",
  fontSize: "18px",
  lineHeight: "1.33333333",
  "&:focus": {
    "--saf-0": "rgba( 18, 100, 163, 1)",
    boxShadow: "0 0 0 1px rgba( 134, 134, 134, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)",
  },
});

export const Button = styled.button({
  marginBottom: "12px",
  width: "100%",
  maxWidth: "100%",
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
    "--saf-0": "rgba( 18, 100, 163, 1)",
    boxShadow: "0 0 0 1px rgba( 134, 134, 134, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)",
  },
});

export const Error = styled.div({
  color: "#e01e5a",
  margin: "8px 0 16px",
  fontWeight: "bold",
});

export const Success = styled.div({
  color: "#2eb67d",
  margin: "8px 0 16px",
  fontWeight: "bold",
});

export const LinkContainer = styled.p({
  fontSize: "13px",
  color: "#616061",
  margin: "0 auto 8px",
  width: "400px",
  maxWidth: "400px",
  "& a": {
    color: "#1264a3",
    textDecoration: "none",
    fontWeight: 700,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
