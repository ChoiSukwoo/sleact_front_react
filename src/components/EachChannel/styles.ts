import styled from "@emotion/styled";
import { Util } from "Styles";
import { NavLink } from "react-router-dom";

export const ChannelLink = styled(NavLink)({
  "&.active": {
    fontWeight: "bold",
    color: "#fff",
  },
});

export const ChannelLoadingCover = styled.div({
  display: "flex",
  alignItems: "center",
  paddingLeft: "46px",
  height: "28px",
});

export const ChannelLoading = styled.div({
  ...Util.LoadingBg,
  width: "60%",
  height: "18px",
});
