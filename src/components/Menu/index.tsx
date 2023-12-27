import { MenuBackground, CloseModalButton, MenuContent } from "./styles";
import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useCallback } from "react";

import CloseIcon from "@svg/clear.svg?react";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style?: CSSProperties;
}

const Menu: FC<PropsWithChildren<Props>> = ({ style, show, children, onCloseModal }) => {
  const stopPropagation = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    event.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <>
      <MenuBackground onClick={onCloseModal} />
      <MenuContent onClick={stopPropagation} style={style}>
        <CloseModalButton onClick={onCloseModal}>
          <CloseIcon />
        </CloseModalButton>{" "}
        {children}
      </MenuContent>
    </>
  );
};

export default Menu;
