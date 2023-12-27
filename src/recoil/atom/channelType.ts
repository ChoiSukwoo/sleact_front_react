import { atom } from "recoil";

const channelTypeState = atom<ChannelType>({
  key: "channelTypeState",
  default: { type: undefined, id: undefined },
});
export default channelTypeState;
