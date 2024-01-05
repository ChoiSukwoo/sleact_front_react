import styled from "@emotion/styled";

export const ChatZone = styled.div({
  width: "100%",
  display: "flex",
  flex: 1,
});

export const ChatZoneLoading = styled.div({
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const Section = styled.section({
  marginTop: "20px",
  borderTop: "1px solid #eee",
});

export const StickyHeader = styled.div({
  display: "flex",
  justifyContent: "center",
  flex: 1,
  width: "100%",
  position: "sticky",
  top: "14px",
  button: {
    fontWeight: "bold",
    fontSize: "13px",
    height: "28px",
    lineHeight: "27px",
    padding: "0 16px",
    zIndex: 2,
    boxShadow: "0 0 0 1px rgba(29, 28, 29, 0.13), 0 1px 3px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: "24px",
    position: "relative",
    top: "-13px",
    background: "white",
    border: "none",
    outline: "none",
  },
});
