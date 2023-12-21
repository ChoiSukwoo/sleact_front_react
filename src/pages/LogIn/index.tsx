import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { getFetcher } from "@utils/fetcher";
import { useQuery } from "react-query";
import { useState } from "react";

import useAxiosPost from "@utils/useAxiosPost";
import { Button } from "@components/Button";

import { Header, LinkContainer, Error, Form } from "./styles";
import Loading from "./loading";
import { LabelText } from "@components/LabelText";
import { InputText } from "@components/InputText";

const LogIn = () => {
  const { data: userData, refetch } = useQuery<IUser | false, Error>("userInfo", () => getFetcher("/api/users"));
  const postRequest = useAxiosPost();

  const [errorMsg, setErrorMsg] = useState<string>();
  const { register, handleSubmit } = useForm<LoginDTO>();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setErrorMsg(undefined);

    postRequest("/api/users/login", data, { withCredentials: true })
      .then(() => {
        refetch();
      })
      .catch((error: ApiErrorDto | undefined) => {
        if (error) {
          setErrorMsg(error.message[0] || "로그인중 에러가 발생하였습니다.");
        } else {
          setErrorMsg("로그인중 에러가 발생하였습니다.");
        }
      });
  };

  const onError: SubmitErrorHandler<LoginDTO> = (error) => {
    if (error.email) {
      setErrorMsg("이메일을 입력해 주세요");
      return;
    }

    if (error.password) {
      setErrorMsg("비밀번호를 입력해 주세요");
      return;
    }
  };

  return userData === undefined ? (
    <Loading />
  ) : (
    <div>
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <LabelText id="email-label" style={{ marginBottom: "16px" }}>
          <span>이메일 주소</span>
          <InputText type="email" id="email" {...register("email", { required: true })} />
        </LabelText>
        <LabelText id="password-label" style={{ marginBottom: "16px" }}>
          <span>비밀번호</span>
          <InputText type="password" id="password" {...register("password", { required: true })} />
          {errorMsg && <Error>{errorMsg}</Error>}
        </LabelText>
        <Button type="submit" style={{ marginBottom: "12px" }}>
          로그인
        </Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
