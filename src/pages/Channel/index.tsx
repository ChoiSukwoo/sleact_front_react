import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import useSocket from "@hooks/useSocket";
import { Container, DragOver } from "./styles";
import chatTypeState from "@recoil/atom/channelType";
import { getFetcher } from "@utils/fetcher";
import makeSection from "@utils/makeSection";
import { ChangeEventHandler, DragEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";
import Header from "./components/Header";
import useAxiosPost from "@utils/useAxiosPost";
import { toast } from "react-toastify";
import { ImgUploadFailToken, ImgUploadSuccessToken, InvalidChannelToken } from "@const/Toast";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import lastReadState from "@recoil/atom/lastRead";
import chatTimeToSoule from "@utils/chatTimeToSoule";

const PAGE_SIZE = 20;
const SNAP_HEIGHT = 150;

const Channel = () => {
  //param Data
  const { workspace } = useParams<{ workspace: string }>();
  const { channel } = useParams<{ channel: string }>();
  const storageKey = `channel-lastRead-${workspace}-${channel}`;

  //recoil Data
  const setChatType = useSetRecoilState(chatTypeState);
  const setLastRead = useSetRecoilState(lastReadState(storageKey));

  //hook
  const [socket] = useSocket(workspace);
  const postRequest = useAxiosPost();
  const navigate = useNavigate();
  const scrollbarRef = useRef<Scrollbars>(null);

  const [dragOver, setDragOver] = useState(false);
  const [chatSections, setChatSections] = useState<MakeSectionResult>({});
  const [receivedChatMap, setReceivedChatMap] = useState<{ [key: string]: IChat[] }>({});
  const [tempChatMap, setTempChatMap] = useState<{ [key: string]: IChat[] }>({});

  //sever Data
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));

  const { data: channelMembers } = useQuery<IUser[]>(
    ["channelMembers", workspace, channel],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel}/members`),
    {
      enabled: !!workspace && !!channel,
      refetchOnMount: "always",
    }
  );

  const { data: channelData } = useQuery<IChannel, Error>(
    ["channelData", workspace, channel],
    () => getFetcher(`/api/workspaces/${workspace}/channels/${channel}`),
    {
      enabled: !!workspace && !!channel,
    }
  );

  const {
    data: chatListData,
    fetchNextPage, //다음 데이터 호출하기
    hasNextPage, //데이터 호출이 가능한 상태인가 파악
    isFetchingNextPage, //데이터를 불러오는중
  } = useInfiniteQuery(
    ["channelChatListData", workspace, channel],
    async ({ pageParam = 1 }): Promise<IChat[]> => {
      const skip = !!(channelData && receivedChatMap[channelData.id]) ? receivedChatMap[channelData.id].length : 0;
      const chats: IChat[] = await getFetcher(
        `/api/workspaces/${workspace}/channels/${channel}/chats?perpage=${PAGE_SIZE}&page=${pageParam}&skip=${skip}`
      );

      if (import.meta.env.MODE === "production") {
        return chats.map((chat) => chatTimeToSoule(chat));
      } else {
        return chats;
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length < PAGE_SIZE ? false : allPages.length + 1),
      enabled: !!workspace && !!channel,
      refetchOnMount: "always",
      onSuccess(data) {
        if (data.pages.length === 1) {
          setTimeout(() => scrollbarRef.current?.scrollToBottom(), 150);
        }
      },
    }
  );

  //채팅 전송
  const onSubmitForm = useCallback(
    (chat: string) => {
      if (chat?.trim() && chatListData && channelData && userData) {
        //옵티미스틱 처리
        const tempChat: IChat = {
          id: 0,
          userId: userData.id,
          user: userData,
          content: chat,
          createdAt: new Date(),
          channelId: channelData.id,
          channel: channelData,
        };

        setTempChatMap((prev) => ({
          ...prev,
          [channelData.id]: [...(prev[channelData.id] || []), tempChat],
        }));

        postRequest(
          `/api/workspaces/${workspace}/channels/${channel}/chats`,
          {
            content: chat,
          },
          { withCredentials: true }
        ).finally(() => {
          setTempChatMap((prev) => {
            const prevChats = prev[channelData.id] || [];
            const updatedChats = prevChats.filter((chat) => chat !== tempChat); // tempChat 객체를 이용하여 비교
            return {
              ...prev,
              [channelData.id]: updatedChats,
            };
          });
        });
      }
    },
    [chatListData, channelData, userData]
  );

  //모든 채팅 파편 합치기
  useEffect(() => {
    if (!channelData) {
      return;
    }
    const newChatList = chatListData?.pages.flat().reverse() ?? [];
    const receivedChatList = receivedChatMap[channelData.id] || [];
    const tempChatList = tempChatMap[channelData.id] || [];
    const chatList = makeSection(newChatList.concat(receivedChatList).concat(tempChatList));
    setChatSections(chatList);
    scrollToBottom();
  }, [channelData, chatListData, receivedChatMap, tempChatMap]);

  const onMessage = useCallback(
    (data: IChat) => {
      if (!channelData || data.channel.name !== channel) {
        return;
      }

      const chat = import.meta.env.MODE === "production" ? chatTimeToSoule(data) : data;

      //접속 이후 채팅내용 기록
      setReceivedChatMap((prev) => ({
        ...prev,
        [channelData.id]: [...(prev[channelData.id] || []), chat],
      }));

      //마지막으로 읽은 시간 기록
      const nowTime = new Date(chat.createdAt).getTime();
      localStorage.setItem(storageKey, nowTime.toString());
      setLastRead(nowTime);
    },
    [channel, userData, channelData]
  );

  //150미만 떨어졋을시 바닥으로 스냅
  const scrollToBottom = useCallback(() => {
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
  }, []);

  useEffect(() => {
    socket?.on("message", onMessage);
    return () => {
      socket?.off("message", onMessage);
    };
  }, [socket, onMessage]);

  //채널 접속후 마지막 읽은 시간 갱신
  useEffect(() => {
    if (!workspace || !channelData) {
      return;
    }
    const nowTime = new Date().getTime();
    localStorage.setItem(storageKey, nowTime.toString());
    setLastRead(nowTime);
  }, [channelData, workspace]);

  //가입하지않은 채널 접근 제한
  useEffect(() => {
    if (!workspace || !channelMembers || !userData || !channel) {
      return;
    }

    if (channelMembers.some((m) => m.id === userData?.id)) {
      setChatType({ type: "channel", value: channel });
    } else {
      toast.error(InvalidChannelToken.msg(channel), {
        toastId: InvalidChannelToken.id,
      });
      navigate(`/workspace/${workspace}/channel/일반`);
    }

    return () => {
      setChatType({ type: undefined, value: undefined });
    };
  }, [channelMembers, channel, userData, workspace]);

  const onDragEnter = useCallback<DragEventHandler>((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragOver = useCallback<DragEventHandler>((e) => {
    e.preventDefault();
    if (!dragOver) setDragOver(true);
  }, []);

  const onDragLeave = useCallback<DragEventHandler>((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onDrop = useCallback<DragEventHandler>(
    (e) => {
      e.preventDefault();
      if (!channelData || !userData) {
        return;
      }
      setDragOver(false);

      const formData = new FormData();
      if (e.dataTransfer.items) {
        if (e.dataTransfer.items.length > 10) {
          toast.error(ImgUploadFailToken.msg("이미지는 최대 10장이 추가됩니다."), { toastId: ImgUploadFailToken.id });
          return;
        }
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (e.dataTransfer.items[i].kind === "file") {
            const file = e.dataTransfer.items[i].getAsFile();
            if (file && file.type.startsWith("image/")) {
              // console.log(e, ".... file[" + i + "].name = " + file.name);
              formData.append("image", file);
            }
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        if (e.dataTransfer.files.length > 10) {
          toast.error(ImgUploadFailToken.msg("이미지는 최대 10장이 추가됩니다."), { toastId: ImgUploadFailToken.id });
          return;
        }
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          const file = e.dataTransfer.files[i];
          if (file && file.type.startsWith("image/")) {
            // console.log(e, "... file[" + i + "].name = " + file.name);
            formData.append("image", file);
          }
        }
      }

      postRequest(`/api/workspaces/${workspace}/channels/${channel}/images`, formData, { withCredentials: true })
        .then(() => toast.success(ImgUploadSuccessToken.msg(), { toastId: ImgUploadSuccessToken.id }))
        .catch((error) => toast.error(ImgUploadFailToken.msg(error), { toastId: ImgUploadFailToken.id }));
    },
    [channelData, userData]
  );

  const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (!channelData || !userData) {
        toast.error("채널 데이터 또는 사용자 데이터가 없습니다.");
        return;
      }

      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          const formData = new FormData();
          formData.append("image", file);

          postRequest(`/api/workspaces/${workspace}/channels/${channel}/images`, formData, { withCredentials: true })
            .then(() => toast.success(ImgUploadSuccessToken.msg(), { toastId: ImgUploadSuccessToken.id }))
            .catch((error) => toast.error(ImgUploadFailToken.msg(error), { toastId: ImgUploadFailToken.id }));
        } else {
          toast.error(ImgUploadFailToken.msg("이미지 파일을 선택해주세요."), { toastId: ImgUploadFailToken.id });
        }
      }
    },
    [channelData, userData, workspace, channel]
  );

  return !channelData || !workspace || !channel ? (
    <Loading />
  ) : (
    <Container onDrop={onDrop} onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragLeave}>
      <Header />
      <ChatList
        ref={scrollbarRef}
        isFetching={isFetchingNextPage}
        hasNextPage={hasNextPage}
        chatSections={chatSections}
        getNextPage={fetchNextPage}
      />

      <ChatBox onSubmitForm={onSubmitForm} handleFileChange={handleFileChange} receiver={channel} />
      {dragOver && <DragOver>업로드!</DragOver>}
    </Container>
  );
};

export default Channel;
