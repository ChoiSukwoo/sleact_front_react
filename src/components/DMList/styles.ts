import styled from "@emotion/styled";
import { Util } from "Styles";

interface CollapseButtonProps {
  isDown: boolean;
}

export const TitleCover = styled.div({
  ...Util.DragPrevent,
  display: "flex",
  alignItems: "center",
  height: "36px",
  padding: "0 15px",
  cursor: "pointer",
});

export const CollapseButton = styled.div<CollapseButtonProps>(
  {
    display: "flex",
    width: "26px",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ({ isDown }) => ({
    ...(isDown && { "& svg": { transform: "rotate(180deg)" } }),
  })
);
