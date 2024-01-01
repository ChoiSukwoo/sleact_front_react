import { Link, useNavigate } from "react-router-dom";
import { Form, Error, LinkContainer, Header } from "./styles";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "./loading";
import { useQuery } from "react-query";
import { getFetcher } from "@utils/fetcher";
import useAxiosPost from "@utils/useAxiosPost";
import { toast } from "react-toastify";
import { SignUpSuccessToken } from "@const/Toast";
import { EntityToRegistUserDTO } from "@utils/EntityToDto";

import { InputText } from "@components/InputText";
import { LabelText } from "@components/LabelText";
import { Button } from "@components/Button";

const SignUp = () => {
  const { data: userData } = useQuery<IUser | false, Error>("userInfo", () => getFetcher("/api/users"));
  const [signUpError, setSignUpError] = useState<string[]>([]);

  const postRequest = useAxiosPost();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: {},
  } = useForm<SignUpFromEntity>();

  const emailReg = register("email", {
    required: "이메일을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "이메일을 입력해야 합니다.",
    },
  });

  const nicknameReg = register("nickname", {
    required: "닉네임을 입력해야 합니다",
    validate: {
      hasValue: (value) => value.trim() !== "" || "닉네임을 입력해야 합니다",
    },
  });

  const passwordReg = register("password", {
    required: "패스워드를 입력해야 합니다",
    minLength: { value: 6, message: "비밀번호는 최소 6글자 이상이어야 합니다" },
    validate: {
      hasValue: (value) => value.trim() !== "" || "패스워드를 입력해야 합니다",
      missMatch: (value) => {
        const { passwordCheck } = getValues();
        return value === passwordCheck || "비밀번호가 일치하지 않습니다";
      },
    },
  });

  const passwordCheckReg = register("passwordCheck", {
    required: "패스워드 확인을 입력해야 합니다.",
    validate: {
      hasValue: (value) => value.trim() !== "" || "패스워드 확인을 입력해야 합니다!",
    },
  });

  const onSubmit: SubmitHandler<SignUpFromEntity> = async (data) => {
    const dtoData = EntityToRegistUserDTO(data);
    setSignUpError([]);

    postRequest("/api/users", dtoData, { withCredentials: true })
      .then(() => {
        toast.success(SignUpSuccessToken.msg, { toastId: SignUpSuccessToken.id });
        navigate("/");
      })
      .catch((error: ApiErrorDto | undefined) => {
        if (error) {
          setSignUpError(error.message || ["로그인중 에러가 발생하였습니다."]);
        } else {
          setSignUpError(["로그인중 에러가 발생하였습니다."]);
        }
      });
  };

  const onError: SubmitErrorHandler<SignUpFromEntity> = async (error) => {
    const list: string[] = [];
    error.email && error.email.message && list.push(error.email.message);
    error.nickname && error.nickname.message && list.push(error.nickname.message);
    error.password && error.password.message && list.push(error.password.message);
    error.passwordCheck && error.passwordCheck.message && list.push(error.passwordCheck.message);
    setSignUpError(list);
  };

  return userData === undefined ? (
    <Loading />
  ) : (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <LabelText id="email-label" style={{ marginBottom: "16px" }}>
          <span>이메일 주소</span>
          <InputText id="email-label" type="email" {...emailReg} />
        </LabelText>
        <LabelText id="nickname-label" style={{ marginBottom: "16px" }}>
          <span>닉네임</span>
          <InputText id="nickname-label" type="text" {...nicknameReg} />
        </LabelText>
        <LabelText id="password-label" style={{ marginBottom: "16px" }}>
          <span>비밀번호</span>
          <InputText id="password-label" type="password" {...passwordReg} />
        </LabelText>
        <LabelText id="password-check-label" style={{ marginBottom: "16px" }}>
          <span>비밀번호 확인</span>
          <InputText type="password" {...passwordCheckReg} />
          {signUpError.length > 0 && signUpError.map((msg, index) => <Error key={"signUpError_" + index}>{msg}</Error>)}
        </LabelText>
        <Button type="submit" style={{ marginBottom: "12px" }}>
          회원가입
        </Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
