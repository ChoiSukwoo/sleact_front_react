import { atom, selector } from "recoil";

const chatTypeState = atom<ChatType>({
  key: "chatTypeState",
  default: { type: undefined, value: undefined },
});
export default chatTypeState;

// Selector for channel state
export const channelState = selector<string | undefined>({
  key: "channelState",
  get: ({ get }) => {
    const chatType: ChatType = get(chatTypeState);
    return chatType.type === "channel" ? String(chatType.value) : undefined;
  },
});

// Selector for DM state
export const dmState = selector<number | undefined>({
  key: "dmState",
  get: ({ get }) => {
    const chatType: ChatType = get(chatTypeState);
    return chatType.type === "dm" ? Number(chatType.value) : undefined;
  },
});
