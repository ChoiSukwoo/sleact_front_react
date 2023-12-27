import { atom } from "recoil";

const workspaceState = atom<string | undefined>({
  key: "workspaceState",
  default: undefined,
});
export default workspaceState;
