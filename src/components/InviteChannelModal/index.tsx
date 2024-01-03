import Modal from "@components/Modal";
import { InputText } from "@components/InputText";
import { LabelText } from "@components/LabelText";
import { Button } from "@components/Button";

import { FC, useCallback } from "react";
import { toast } from "react-toastify";
import { InviteChannelSuccessToken, InviteChannelFailToken } from "@const/Toast";
import { currentModalState } from "@recoil/atom/modal";
import workspace from "@recoil/atom/workspace";
import useAxiosPost from "@utils/useAxiosPost";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import channelTypeState from "@recoil/atom/channelType";

interface Props {}

interface InviteChannelDto {
  email: string;
}

const InviteChannelModal: FC<Props> = ({}) => {
  const channel = useRecoilValue(channelTypeState);

  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);

  const isShow = currentModal === "inviteChannel";
  const onClose = useCallback(() => setCurrentModal(undefined), []);

  const { register, handleSubmit, reset } = useForm<InviteChannelDto>();
  const postRequest = useAxiosPost();

  const memberReg = register("email", {
    required: "초대할 유저의 email을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "초대할 유저의 email을 입력해야 합니다",
    },
  });

  const onSubmit: SubmitHandler<InviteChannelDto> = async (data) => {
    setCurrentModal(undefined);
    reset();
    if (channel === undefined || channel.type === "dm") {
      return;
    }
    postRequest(`/api/workspaces/${workspace}/channels/${channel.id}/members`, data)
      .then(() => {
        toast.success(InviteChannelSuccessToken.msg, { toastId: InviteChannelSuccessToken.id });
      })
      .catch((error: ApiErrorDto | undefined) => {
        console.dir(error);
        toast.error(InviteChannelFailToken.msg, { toastId: InviteChannelFailToken.id });
      });
  };

  const onSubmitError: SubmitErrorHandler<InviteChannelDto> = async (error) => {
    if (error.email) {
      toast.error(error.email.message, { toastId: InviteChannelFailToken.id });
      return;
    }
  };

  return (
    <Modal isShow={isShow} onCloseModal={onClose} style={{ width: "450px" }}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <LabelText id="member-label" style={{ marginBottom: "16px" }}>
          <span>채널 멤버 초대</span>
          <InputText id="member" {...memberReg} />
        </LabelText>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
