import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { FC, useCallback } from "react";

import { CreateWorkspaceFailToken, CreateWorkspaceSuccssToken } from "@const/Toast";
import { InputText } from "@components/InputText";
import { LabelText } from "@components/LabelText";
import { Button } from "@components/Button";
import Modal from "@components/Modal";
import useAxiosPost from "@utils/useAxiosPost";
import { getFetcher } from "@utils/fetcher";
import { useRecoilState } from "recoil";
import { currentModalState } from "@recoil/atom/modal";

interface Props {}

interface CreateWorkspaceDto {
  name: string;
  url: string;
}

const CreateWorkspaceModal: FC<Props> = ({}) => {
  const { refetch: userDataRefetch } = useQuery<IUser, Error>("userInfo", () => getFetcher("/api/users"));
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);
  const postRequest = useAxiosPost();

  const { register, handleSubmit, reset } = useForm<CreateWorkspaceDto>();

  const isShow = currentModal === "createWorkspace";
  const onClose = useCallback(() => setCurrentModal(undefined), []);

  const workspaceReg = register("name", {
    required: "워크스페이스 명을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "워크스페이스 명을 입력해야 합니다",
    },
  });

  const urlReg = register("url", {
    required: "url을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "url을 입력해야 합니다",
      isEngNum: (value) => /^[a-zA-Z0-9]+$/.test(value) || "영문자와 숫자만 허용됩니다",
      minLength: (value) => value.replace(/\s/g, "").length >= 3 || "공백을 제외한 최소 3글자 이상 입력해야 합니다",
    },
  });

  const onSubmit: SubmitHandler<CreateWorkspaceDto> = async (data) => {
    postRequest("/api/workspaces", data, { withCredentials: true })
      .then(() => {
        toast.success(CreateWorkspaceSuccssToken.msg(), { toastId: CreateWorkspaceSuccssToken.id });
        reset();
        onClose();
      })
      .catch((error: ApiErrorDto | undefined) => {
        toast.error(CreateWorkspaceFailToken.msg(error?.message[0] ?? ""), { toastId: CreateWorkspaceFailToken.id });
      })
      .finally(() => {
        userDataRefetch();
      });
  };

  const onSubmitError: SubmitErrorHandler<CreateWorkspaceDto> = async (error) => {
    if (error.name) {
      toast.error(CreateWorkspaceFailToken.msg(error.name.message ?? ""), { toastId: CreateWorkspaceFailToken.id });
      return;
    }

    if (error.url) {
      toast.error(CreateWorkspaceFailToken.msg(error.url.message ?? ""), { toastId: CreateWorkspaceFailToken.id });
      return;
    }
  };

  return (
    <Modal isShow={isShow} onCloseModal={onClose} style={{ width: "450px" }}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <LabelText id="workspace-label" style={{ marginBottom: "16px" }}>
          <span>워크스페이스 이름</span>
          <InputText id="workspace" {...workspaceReg} />
        </LabelText>
        <LabelText id="workspace-url-label" style={{ marginBottom: "16px" }}>
          <span>워크스페이스 url</span>
          <InputText id="workspace-url" {...urlReg} />
        </LabelText>
        <Button>생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
