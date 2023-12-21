import styled from "@emotion/styled";
import { Font } from "Styles";

export const LabelText = styled.label({
  display: "block",
  height: "fit-content",
  "> span": {
    ...Font.h6,
    display: "block",
    textAlign: "left",
    paddingBottom: "8px",
    cursor: "pointer",
  },
});
