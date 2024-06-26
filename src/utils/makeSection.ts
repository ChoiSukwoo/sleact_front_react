import dayjs from "dayjs";

const makeSection = (chatList: (IDM | IChat)[]): MakeSectionResult => {
  const section: { [key: string]: (IDM | IChat)[] } = {};
  chatList.forEach((chat: IDM | IChat) => {
    const month = dayjs(chat.createdAt).locale("ko").format("YYYY-MM-DD");
    if (!section[month]) {
      section[month] = [];
    }
    section[month].push(chat);
  });
  return section;
};
export default makeSection;
