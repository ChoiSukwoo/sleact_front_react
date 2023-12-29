import { atom } from "recoil";

export const modalState = atom<modalKey | undefined>({
  key: "channelTypeState",
  default: undefined,
});
