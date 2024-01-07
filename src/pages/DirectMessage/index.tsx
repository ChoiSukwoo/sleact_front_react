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
import { ImgUploadFailToken, ImgUploadSuccessToken, InvalidDmToken } from "@const/Toast";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import lastReadState from "@recoil/atom/lastRead";
import chatTimeToSoule from "@utils/chatTimeToSoule";

const PAGE_SIZE = 20;
const SNAP_HEIGHT = 150;

const DirectMessage = () => {
  //param Data
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const storageKey = `dm-lastRead-${workspace}-${id}`;

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
  const [receivedChatMap, setReceivedChatMap] = useState<{ [key: string]: IDM[] }>({});
  const [tempChatMap, setTempChatMap] = useState<{ [key: string]: IDM[] }>({});

  //sever Data
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));

  const { data: otherData } = useQuery<IUser | false>(
    ["otherMember", workspace, id],
    () => getFetcher(`/api/workspaces/${workspace}/members/${id}`),
    {
      enabled: !!workspace && !!id,
      refetchOnMount: "always",
    }
  );

  const {
    data: chatListData,
    fetchNextPage, //다음 데이터 호출하기
    hasNextPage, //데이터 호출이 가능한 상태인가 파악
    isFetchingNextPage, //데이터를 불러오는중
  } = useInfiniteQuery(
    ["dmChatListData", workspace, id],
    async ({ pageParam = 1 }): Promise<IDM[]> => {
      const skip = !!(id && receivedChatMap[id]) ? receivedChatMap[id].length : 0;
      const chats: IDM[] = await getFetcher(
        `/api/workspaces/${workspace}/dms/${id}/chats?perpage=${PAGE_SIZE}&page=${pageParam}&skip=${skip}`
      );

      if (import.meta.env.MODE === "production") {
        return chats.map((chat) => chatTimeToSoule(chat));
      } else {
        return chats;
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length < PAGE_SIZE ? false : allPages.length + 1),
      enabled: !!workspace && !!id,
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
      if (chat?.trim() && chatListData && otherData && userData && id) {
        //옵티미스틱 처리
        const tempChat: IDM = {
          id: 0,
          senderId: userData.id,
          sender: userData,
          content: chat,
          createdAt: new Date(),
          receiverId: otherData.id,
          receiver: otherData,
        };

        setTempChatMap((prev) => ({
          ...prev,
          [id]: [...(prev[id] || []), tempChat],
        }));

        postRequest(
          `/api/workspaces/${workspace}/dms/${id}/chats`,
          {
            content: chat,
          },
          { withCredentials: true }
        ).finally(() => {
          setTempChatMap((prev) => {
            const prevChats = prev[id] || [];
            const updatedChats = prevChats.filter((chat) => chat !== tempChat); // tempChat 객체를 이용하여 비교
            return {
              ...prev,
              [id]: updatedChats,
            };
          });
        });
      }
    },
    [chatListData, otherData, userData, id]
  );

  //모든 채팅 파편 합치기
  useEffect(() => {
    if (!id) {
      return;
    }
    const newChatList = chatListData?.pages.flat().reverse() ?? [];
    const receivedChatList = receivedChatMap[id] || [];
    const tempChatList = tempChatMap[id] || [];
    const chatList = makeSection(newChatList.concat(receivedChatList).concat(tempChatList));
    setChatSections(chatList);
    scrollToBottom();
  }, [id, chatListData, receivedChatMap, tempChatMap]);

  const onMessage = useCallback(
    (data: IDM) => {
      if (
        !otherData ||
        !id ||
        !userData ||
        !(
          (data.senderId === userData.id && data.receiverId === Number(id)) ||
          (data.senderId === Number(id) && data.receiverId === userData.id)
        )
      ) {
        return;
      }

      const chat = import.meta.env.MODE === "production" ? chatTimeToSoule(data) : data;
      //접속 이후 채팅내용 기록
      setReceivedChatMap((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), chat],
      }));

      //마지막으로 읽은 시간 기록
      const nowTime = new Date(chat.createdAt).getTime();
      localStorage.setItem(storageKey, nowTime.toString());
      setLastRead(nowTime);
    },
    [id, userData, otherData]
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
    socket?.on("dm", onMessage);
    return () => {
      socket?.off("dm", onMessage);
    };
  }, [socket, onMessage]);

  //채널 접속후 마지막 읽은 시간 갱신
  useEffect(() => {
    if (!workspace || !id) {
      return;
    }
    const nowTime = new Date().getTime();
    localStorage.setItem(storageKey, nowTime.toString());
    setLastRead(nowTime);
  }, [workspace, id]);

  //워크스페이스에 존재하지 않는 id 접근 제한
  useEffect(() => {
    if (!workspace || otherData === undefined || !userData || !id) {
      return;
    }

    if (!!otherData) {
      setChatType({ type: "dm", value: id });
    } else {
      toast.error(InvalidDmToken.msg(id), {
        toastId: InvalidDmToken.id,
      });
      navigate(`/workspace/${workspace}/channel/일반`);
    }

    return () => {
      setChatType({ type: undefined, value: undefined });
    };
  }, [workspace, userData, otherData, id]);

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
      if (!otherData || !userData) {
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

      postRequest(`/api/workspaces/${workspace}/dms/${id}/images`, formData, { withCredentials: true })
        .then(() => toast.success(ImgUploadSuccessToken.msg(), { toastId: ImgUploadSuccessToken.id }))
        .catch((error) => toast.error(ImgUploadFailToken.msg(error), { toastId: ImgUploadFailToken.id }));
    },
    [otherData, userData]
  );

  const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (!otherData || !userData) {
        return;
      }

      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          const formData = new FormData();
          formData.append("image", file);

          postRequest(`/api/workspaces/${workspace}/dms/${id}/images`, formData, { withCredentials: true })
            .then(() => toast.success(ImgUploadSuccessToken.msg(), { toastId: ImgUploadSuccessToken.id }))
            .catch((error) => toast.error(ImgUploadFailToken.msg(error), { toastId: ImgUploadFailToken.id }));
        } else {
          toast.error(ImgUploadFailToken.msg("이미지 파일을 선택해주세요."), { toastId: ImgUploadFailToken.id });
        }
      }
    },
    [otherData, userData, workspace, id]
  );

  return !otherData || !workspace || !id ? (
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

      <ChatBox onSubmitForm={onSubmitForm} handleFileChange={handleFileChange} receiver={otherData.nickname} />
      {dragOver && <DragOver>업로드!</DragOver>}
    </Container>
  );
};

export default DirectMessage;
