import { atom } from "recoil";

export const currentModalState = atom<modalKey | undefined>({
  key: "currentModalState",
  default: undefined,
});

//  const [ currentModal, setCurrentModal ] = useRecoilState(currentModalState);
//  const currentModal = useRecoilValue(currentModalState);
//  const setCurrentModal  = useSetRecoilState(currentModalState);

// const isShow = currentModal === "createWorkspace";
// const onClose = useCallback(() => setCurrentModal(undefined), []);

// const onClickCreateWorkspace = useCallback(() => {
//   setCurrentModal("createWorkspace");
// }, []);
