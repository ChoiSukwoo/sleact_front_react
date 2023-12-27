import styled from "@emotion/styled";

export const HeaderStyle = styled.header({
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "38px",
  background: "#350d36",
  color: "#ffffff",
  boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.1)",
  padding: "5px",
  textAlign: "center",
});

export const ProfileImg = styled.img({
  width: "28px",
  height: "28px",
  position: "absolute",
  top: "5px",
  right: "16px",
});

export const ProfileModal = styled.div({
  display: "flex",
  padding: "20px",
  "> img": {
    display: "flex",
  },
  "> div": {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
  },
  "#profile-name": {
    fontWeight: "bold",
    display: "inline-flex",
  },
  "#profile-active": {
    fontSize: "13px",
    display: "inline-flex",
  },
});

export const LogOutButton = styled.button({
  border: "none",
  width: "100%",
  borderTop: "1px solid rgb(29, 28, 29)",
  background: "transparent",
  display: "block",
  height: "33px",
  padding: "5px 20px 5px",
  outline: "none",
  cursor: "pointer",
});
