import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { FC } from "react";

import { InviteWorkspaceFailToken, InviteWorkspaceSuccessToken } from "@const/Toast";
import { InputText } from "@components/InputText";
import { LabelText } from "@components/LabelText";
import { Button } from "@components/Button";
import Modal from "@components/Modal";

import useAxiosPost from "@utils/useAxiosPost";
import { getFetcher } from "@utils/fetcher";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

interface InviteWorkspaceDto {
  email: string;
}

const InviteWorkspaceModal: FC<Props> = ({ isShow, onClose }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const { data: userData } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const { refetch: refetchMember } = useQuery<IChannel[], Error>(
    [workspace, "members"],
    () => getFetcher(`/api/workspaces/${workspace}/members`),
    {
      enabled: userData !== undefined && workspace !== undefined,
    }
  );

  const { register, handleSubmit, reset } = useForm<InviteWorkspaceDto>();
  const postRequest = useAxiosPost();

  const memberReg = register("email", {
    required: "초대할 유저의 email을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "초대할 유저의 email을 입력해야 합니다",
    },
  });

  const onSubmit: SubmitHandler<InviteWorkspaceDto> = async (data) => {
    postRequest(`/api/workspaces/${workspace}/members`, data)
      .then(() => {
        toast.success(InviteWorkspaceSuccessToken.msg, { toastId: InviteWorkspaceSuccessToken.id });
        reset();
        onClose();
      })
      .catch((error: ApiErrorDto | undefined) => {
        console.dir(error);
        toast.error(InviteWorkspaceFailToken.msg, { toastId: InviteWorkspaceFailToken.id });
      })
      .finally(() => {
        refetchMember();
      });
  };

  const onSubmitError: SubmitErrorHandler<InviteWorkspaceDto> = async (error) => {
    if (error.email) {
      toast.error(error.email.message, { toastId: InviteWorkspaceFailToken.id });
      return;
    }
  };

  return (
    <Modal isShow={isShow} onCloseModal={onClose} style={{ width: "450px" }}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <LabelText id="member-label">
          <span>이메일</span>
          <InputText id="member" type="email" {...memberReg} />
        </LabelText>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
