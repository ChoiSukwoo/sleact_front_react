import { Header, Label, Input, Button, LinkContainer, Error, Form } from "./styles";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { getFetcher } from "@utils/fetcher";
import { useQuery } from "react-query";

const LogIn = () => {
  const {
    data: userData,
    error,
    refetch,
  } = useQuery<IUser | false, Error>("userInfo", () => getFetcher("/api/users"), {
    staleTime: 10000,
  });

  const [logInError, setLogInError] = useState(false);

  const { register, handleSubmit } = useForm<LoginDTO>();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setLogInError(false);

    axios
      .post("/api/users/login", data, { withCredentials: true })
      .then((responese) => {
        console.log("responese : ", responese.data);
        refetch();
      })
      .catch((error) => {
        console.log("error : ", error);
        setLogInError(error.response?.status === 401);
      });
  };

  const onError: SubmitErrorHandler<LoginDTO> = (error) => {
    console.log("입력값이 모자라...");
  };

  if (userData === undefined) {
    return <div>Loading</div>;
  }

  if (!error && userData) {
    return <Navigate to="/workspace/sleact/channel/일반" replace={true} />;
  }

  return (
    <div>
      <Header>Sleact</Header>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" {...register("email", { required: true })} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" {...register("password", { required: true })} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
