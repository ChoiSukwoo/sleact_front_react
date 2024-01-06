import { atomFamily } from "recoil";

const lastReadState = atomFamily<number, string>({
  key: "lastReadState", // 고유한 key 값
  default: 0, // 기본값
});

export default lastReadState;
