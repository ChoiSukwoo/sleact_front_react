import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import useSocket from "@hooks/useSocket";
import { Container } from "@pages/Channel/styles";
import channelTypeState from "@recoil/atom/channelType";
import workspaceState from "@recoil/atom/workspace";
import { getFetcher } from "@utils/fetcher";
import makeSection from "@utils/makeSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "./components/Header";
import useAxiosPost from "@utils/useAxiosPost";

const PAGE_SIZE = 20;
const SNAP_HEIGHT = 150;

const Channel = () => {
  const workspace = useRecoilValue(workspaceState);
  const { channel } = useParams<{ channel: string }>();
  const setChannelType = useSetRecoilState(channelTypeState);
  const [socket] = useSocket(workspace);
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const { data: channelData } = useQuery<IChannel, Error>(
    ["channelData", workspace, channel],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel}`),
    {
      enabled: workspace !== undefined && channel !== undefined,
    }
  );

  //채널 접속후 마지막 읽은 시간 갱신
  useEffect(() => {
    if (!workspace || !channelData) {
      return;
    }
    const nowTime = new Date().getTime();
    const storageKey = `workspace-lastRead-${workspace}-${channelData.id}`;
    localStorage.setItem(storageKey, nowTime.toString());
    postRequest(`/api/users/workspace/${workspace}/channel/${channelData.id}/lastread`, {
      time: nowTime,
    });
  }, [channelData, workspace]);

  const [tempChat, setTempChat] = useState<{ [key: string]: IChat[] }>({});

  const {
    data: chatData,
    fetchNextPage, //다음 데이터 호출하기
    hasNextPage, //데이터 호출이 가능한 상태인가 파악
    isFetchingNextPage, //데이터를 불러오는중
  } = useInfiniteQuery(
    ["chatData", workspace, channel],
    ({ pageParam = 1 }): Promise<IChat[]> => {
      const skip = channel && tempChat[channel] ? tempChat[channel].length : 0;
      return getFetcher(
        `/api/workspaces/${workspace}/channels/${channel}/chats?perpage=${PAGE_SIZE}&page=${pageParam}&skip=${skip}`
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length < PAGE_SIZE ? false : allPages.length + 1),
      enabled: workspace !== undefined && channel !== undefined, // enabled 옵션을 추가
      onSuccess(data) {
        if (data.pages.length === 1) {
          setTimeout(() => scrollbarRef.current?.scrollToBottom(), 100);
        }
      },
    }
  );
  const postRequest = useAxiosPost();

  const [chatSections, setChatSections] = useState<MakeSectionResult>({});

  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    if (channel) {
      const newChatList = chatData?.pages.flat().reverse() ?? [];
      const tempChatList = tempChat[channel] || [];
      const chatList = makeSection(newChatList.concat(tempChatList));
      setChatSections(chatList);
    }
  }, [chatData, tempChat, channel]);

  const onMessage = useCallback(
    (data: IChat) => {
      if (!channelData || data.channel.name !== channel) {
        return;
      }

      //접속 이후 채팅내용 기록
      setTempChat((prev) => ({
        ...prev,
        [channel]: [...(prev[channel] || []), data],
      }));

      //마지막으로 읽은 시간 기록
      const nowTime = new Date(data.createdAt).getTime();
      const storageKey = `workspace-lastRead-${workspace}-${channelData.id}`;
      localStorage.setItem(storageKey, nowTime.toString());
      postRequest(`/api/users/workspace/${workspace}/channel/${channelData.id}/lastread`, {
        time: nowTime,
      });

      //스크롤 조정
      const current = scrollbarRef.current;
      if (current) {
        if (
          scrollbarRef.current.getScrollHeight() <
          scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + SNAP_HEIGHT
        ) {
          setTimeout(() => {
            scrollbarRef.current?.scrollToBottom();
          }, 10);
        }
      }
    },
    [channel, userData, channelData]
  );

  useEffect(() => {
    socket?.on("message", onMessage);
    return () => {
      socket?.off("message", onMessage);
    };
  }, [socket, onMessage]);

  // const onDrop = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //     const formData = new FormData();
  //     if (e.dataTransfer.items) {
  //       // Use DataTransferItemList interface to access the file(s)
  //       for (let i = 0; i < e.dataTransfer.items.length; i++) {
  //         // If dropped items aren't files, reject them
  //         console.log(e.dataTransfer.items[i]);
  //         if (e.dataTransfer.items[i].kind === "file") {
  //           const file = e.dataTransfer.items[i].getAsFile();
  //           console.log(e, ".... file[" + i + "].name = " + file.name);
  //           formData.append("image", file);
  //         }
  //       }
  //     } else {
  //       // Use DataTransfer interface to access the file(s)
  //       for (let i = 0; i < e.dataTransfer.files.length; i++) {
  //         console.log(e, "... file[" + i + "].name = " + e.dataTransfer.files[i].name);
  //         formData.append("image", e.dataTransfer.files[i]);
  //       }
  //     }
  //     axios.post(`/api/workspaces/${workspace}/channels/${channel}/images`, formData).then(() => {
  //       setDragOver(false);
  //       localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
  //     });
  //   },
  //   [workspace, channel]
  // );

  // const onDragOver = useCallback((e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   setDragOver(true);
  // }, []);

  // if (channelsData && !channelData) {
  //   return <Redirect to={`/workspace/${workspace}/channel/일반`} />;
  // }

  const onDrop = useCallback(() => {}, []);
  const onDragOver = useCallback(() => {}, []);

  useEffect(() => {
    setChannelType({ type: "channel", id: channel });
    return () => {
      setChannelType({ type: undefined, id: undefined });
    };
  }, [channel]);

  const onSubmitForm = useCallback(
    (chat: string) => {
      if (chat?.trim() && chatData && channelData && userData) {
        postRequest(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
          content: chat,
        });
      }
    },
    [chatData, channelData, userData]
  );
  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
      <Header />
      <ChatList
        ref={scrollbarRef}
        isFetching={isFetchingNextPage}
        hasNextPage={hasNextPage}
        chatSections={chatSections}
        getNextPage={fetchNextPage}
      />

      <ChatBox onSubmitForm={onSubmitForm} />
      {/*
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
      <ToastContainer position="bottom-center" />
      {dragOver && <DragOver>업로드!</DragOver>} */}
    </Container>
  );
};

export default Channel;
