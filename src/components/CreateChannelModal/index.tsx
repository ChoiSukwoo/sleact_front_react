import { Button } from "@components/Button";
import { InputText } from "@components/InputText";
import { LabelText } from "@components/LabelText";
import Modal from "@components/Modal";
import { CreateChannelFailToken, CreateChannelSuccssToken } from "@const/Toast";
import { currentModalState } from "@recoil/atom/modal";
import { getFetcher } from "@utils/fetcher";
import useAxiosPost from "@utils/useAxiosPost";
import { FC, useCallback } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

interface Props {}

interface CreateChannelDto {
  name: string;
}

const CreateChannelModal: FC<Props> = ({}) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const { refetch: refetchChannel } = useQuery<IChannel[], Error>(
    [workspace, "channels"],
    () => getFetcher(`/api/workspaces/${workspace}/channels`),
    {
      enabled: userData !== undefined,
    }
  );
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);

  const isShow = currentModal === "createChannel";
  const onClose = useCallback(() => setCurrentModal(undefined), []);

  const { register, handleSubmit, reset } = useForm<CreateChannelDto>();
  const postRequest = useAxiosPost();

  const channelReg = register("name", {
    required: "채널 명을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "채널 명을 입력해야 합니다",
    },
  });

  const onSubmit: SubmitHandler<CreateChannelDto> = async (data) => {
    postRequest(`/api/workspaces/${workspace}/channels`, data, { withCredentials: true })
      .then(() => {
        toast.success(CreateChannelSuccssToken.msg(), { toastId: CreateChannelSuccssToken.id });
        reset();
        onClose();
      })
      .catch((error: ApiErrorDto | undefined) => {
        toast.error(CreateChannelFailToken.msg(error?.message[0] ?? ""), { toastId: CreateChannelFailToken.id });
      })
      .finally(() => {
        refetchChannel();
      });
  };

  const onSubmitError: SubmitErrorHandler<CreateChannelDto> = async (error) => {
    if (error.name) {
      toast.error(CreateChannelFailToken.msg(error.name.message ?? ""), { toastId: CreateChannelFailToken.id });
      return;
    }
  };

  return (
    <Modal isShow={isShow} onCloseModal={onClose} style={{ width: "450px" }}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <LabelText id="channel-label" style={{ marginBottom: "16px" }}>
          <span>채널 이름</span>
          <InputText id="channel" {...channelReg} />
        </LabelText>
        <Button>생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
