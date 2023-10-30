import { Link } from "react-router-dom";
import axios from "axios";
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from "./styles";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { apiError } from "@utils/apiErrorData";

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<string[]>([]);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpDTO>();

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

  const onSubmit: SubmitHandler<SignUpDTO> = async (data) => {
    const { passwordCheck, ...registUserData } = data;
    setSignUpSuccess(false);
    setSignUpError([]);
    axios
      .post("/api/users", registUserData)
      .then(() => {
        setSignUpSuccess(true);
      })
      .catch((error) => {
        const apiErrorData = apiError(error);
        setSignUpError(apiErrorData);
      });
  };

  const onError: SubmitErrorHandler<SignUpDTO> = async (error) => {
    console.log("SubmitError : ", error);
  };

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <Input type="email" id="email" {...emailReg} />
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <Input type="text" id="nickname" {...nicknameReg} />
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <Input type="password" id="password" {...passwordReg} />
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <Input type="password" id="password-check" {...passwordCheckReg} />
          {errors.email && <Error>{errors.email.message}</Error>}
          {errors.nickname && <Error>{errors.nickname.message}</Error>}
          {errors.password && <Error>{errors.password.message}</Error>}
          {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
          {signUpError.length > 0 && signUpError.map((errorMessage, index) => <Error key={signUpError + "_" + index}>{errorMessage}</Error>)}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
