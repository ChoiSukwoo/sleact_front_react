import { BackgroundStyle, CloseModalButton, ModalStyle } from "@components/Modal/styles";
import { CSSProperties, FC, MouseEventHandler, PropsWithChildren, useCallback } from "react";

import CloseIcon from "@svg/clear.svg?react";

interface Props {
  isShow: boolean;
  onCloseModal: () => void;
  style?: CSSProperties;
}

const Modal: FC<PropsWithChildren<Props>> = ({ isShow, children, onCloseModal, style }) => {
  const stopPropagation = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    e.stopPropagation();
  }, []);

  return !isShow ? (
    <></>
  ) : (
    <BackgroundStyle onClick={onCloseModal}>
      <ModalStyle style={style} onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>
          <CloseIcon />
        </CloseModalButton>
        {children}
      </ModalStyle>
    </BackgroundStyle>
  );
};

export default Modal;
