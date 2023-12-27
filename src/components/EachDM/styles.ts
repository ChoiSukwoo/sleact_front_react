import styled from "@emotion/styled";
import { Util } from "Styles";
import { NavLink } from "react-router-dom";

export const DMLink = styled(NavLink)({
  "&.active": {
    fontWeight: "bold",
    color: "#fff",
  },
});

export const IsOnlineChecker = styled.div<{ isOnline: boolean }>(({ isOnline }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  marginRight: "5px",
  ...(isOnline
    ? {
        backgroundColor: "green",
      }
    : {
        border: "3px solid",
        borderColor: "gray",
      }),
}));

export const DmLoadingCover = styled.div({
  display: "flex",
  alignItems: "center",
  paddingLeft: "46px",
  height: "28px",
});

export const DmLoading = styled.div({
  ...Util.LoadingBg,
  width: "60%",
  height: "18px",
});
