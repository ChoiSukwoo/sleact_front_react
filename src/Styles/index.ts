import { CSSObject } from "@emotion/react";
import { CSSProperties } from "react";
import { keyframes } from "@emotion/react";

export const Color = {
  gray009: "#1b1d1f" as CSSProperties["color"],
  gray006: "#26282b" as CSSProperties["color"],
  gray005: "#464c52" as CSSProperties["color"],
  gray004: "#73787e" as CSSProperties["color"],
  gray003: "#9fa4a9" as CSSProperties["color"],
  gray002: "#e9ebed" as CSSProperties["color"],
  gray001: "#f7f8f9" as CSSProperties["color"],
};

export const Font = {
  h1: {
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "46px",
    letterSpacing: "-0.75px",
  } as CSSObject,
  h2: {
    fontFamily: "Pretendard",
    fontStyle: "normal",
  } as CSSObject,
  h3: {
    fontFamily: "Pretendard",
    fontStyle: "normal",
  } as CSSObject,
  h6: {
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "1.45",
  } as CSSObject,
};

export const Util = {
  Error: {
    color: "#e01e5a",
    fontWeight: "700",
  } as CSSObject,
  Success: {
    color: "#2eb67d",
    fontWeight: "700",
  } as CSSObject,
  DragPrevent: {
    msUser: "none",
    MozUserDrag: "none",
    KhtmlUserDrag: "none",
    WebkitUserDrag: "none",
    userSelect: "none",
    msUserSelect: "none",
    MozUserSelect: "none",
    KhtmlUserSelect: "none",
    WebkitUserSelect: "none",
  } as CSSObject,
  LineCutting: (props: { line: number }): CSSObject => ({
    display: "-webkit-box",
    wordWrap: "break-word",
    WebkitLineClamp: props.line,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  ButtonStyleRemove: {
    backgroundColor: "transparent",
    color: "inherit",
    border: "none",
    padding: 0,
    cursor: "pointer",
    outline: "inherit",
  },
  LoadingBg: {
    backgroundColor: Color.gray002,
    borderRadius: "4px",
    animation: `${keyframes({
      "0%": {
        backgroundColor: Color.gray002,
      },
      "50%": {
        backgroundColor: Color.gray003,
      },
      "100% ": {
        backgroundColor: Color.gray002,
      },
    })}  2.5s infinite ease-in-out`,
  } as CSSObject,
  ContentWidth: {
    flexShrink: 0,
    minWidth: "1140px",
    "&>*": {
      maxWidth: "1140px",
      width: "100%",
    },
  },
  FlexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const styles = {
  Color: Color,
  Font: Font,
  Util: Util,
};

export default styles;
