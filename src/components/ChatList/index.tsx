import Chat from "@components/Chat";
import { ChatZone, Section, StickyHeader } from "@components/ChatList/styles";
import { FC, MutableRefObject, forwardRef, useCallback } from "react";
import { Scrollbars, positionValues } from "react-custom-scrollbars-2";

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  isEmpty: boolean;
  isReachingEnd?: boolean;
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
}
const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, isReachingEnd, isEmpty, setSize }, scrollRef) => {
  // const onScroll = useCallback(
  //   (values: positionValues) => {
  //     if (values.scrollTop === 0 && !isReachingEnd) {
  //       setSize((size) => size + 1).then(() => {
  //         const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
  //         if (current) {
  //           current.scrollTop(current.getScrollHeight() - values.scrollHeight);
  //         }
  //       });
  //     }
  //   },
  //   [isReachingEnd, scrollRef, setSize]
  // );

  // return (
  //   <ChatZone>
  //     <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
  //       {Object.entries(chatSections).map(([dateData, chatData]) => (
  //         <Section className={`section-${dateData}`} key={dateData}>
  //           <StickyHeader>
  //             <button>{dateData}</button>
  //           </StickyHeader>
  //           {chatData.map((chat) => (
  //             <Chat key={chat.id} data={chat} />
  //           ))}
  //         </Section>
  //       ))}
  //     </Scrollbars>
  //   </ChatZone>
  // );
  return <></>;
});

export default ChatList;
