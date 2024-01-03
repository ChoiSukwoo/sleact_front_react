import { MenuBackground, CloseModalButton, MenuContent } from "./styles";
import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useCallback } from "react";

import CloseIcon from "@svg/clear.svg?react";
import { currentModalState } from "@recoil/atom/modal";
import { useSetRecoilState } from "recoil";

interface Props {
  style?: CSSProperties;
}

const Menu: FC<PropsWithChildren<Props>> = ({ style, children }) => {
  const setCurrentModal = useSetRecoilState(currentModalState);

  const onClose = useCallback(() => setCurrentModal(undefined), []);

  const stopPropagation = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    event.stopPropagation();
  }, []);

  return (
    <>
      <MenuBackground onClick={onClose} />
      <MenuContent onClick={stopPropagation} style={style}>
        <CloseModalButton onClick={onClose}>
          <CloseIcon />
        </CloseModalButton>
        {children}
      </MenuContent>
    </>
  );
};

export default Menu;
