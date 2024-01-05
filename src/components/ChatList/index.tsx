import Chat from "@components/Chat";
import { ChatZone, Section, StickyHeader } from "@components/ChatList/styles";
import { MutableRefObject, forwardRef, useCallback } from "react";
import { Scrollbars, positionValues } from "react-custom-scrollbars-2";
import { InfiniteQueryObserverResult } from "react-query";

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  hasNextPage?: boolean;
  isFetching: boolean;
  getNextPage: () => Promise<InfiniteQueryObserverResult<(IDM | IChat)[], unknown>>;
}
const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, hasNextPage, isFetching, getNextPage }, scrollRef) => {
  const onScroll = useCallback(
    (values: positionValues) => {
      if (values.scrollTop < 5 && hasNextPage && !isFetching) {
        getNextPage().then(() => {
          const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          if (current) {
            const nowHeight = current.getScrollHeight();
            setTimeout(() => {
              const newHeight = current.getScrollHeight();
              current.scrollTop(newHeight - nowHeight);
            }, 2);
          }
        });
      }
    },
    [hasNextPage, scrollRef, getNextPage]
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([dateData, chatData]) => (
          <Section key={dateData}>
            <StickyHeader>
              <button>{dateData}</button>
            </StickyHeader>
            {chatData.map((chat) => (
              <Chat key={chat.id} data={chat} />
            ))}
          </Section>
        ))}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;
