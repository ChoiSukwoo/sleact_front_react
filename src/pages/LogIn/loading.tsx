import { FC } from "react";
import { Form, Header, LinkContainer } from "./styles";
import { LoadingBar } from "@components/LoadingBar";
import { Button } from "@components/Button";

const Loading: FC = () => {
  return (
    <>
      <Header>slack</Header>
      <Form as={"div"}>
        <div style={{ marginBottom: "20px" }}>
          <h6 style={{ marginBottom: "8px" }}>이메일 주소</h6>
          <LoadingBar style={{ height: "44px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h6 style={{ marginBottom: "8px" }}>비밀번호</h6>
          <LoadingBar style={{ height: "44px" }} />
        </div>
        <Button style={{ marginBottom: "12px" }}>로그인</Button>
        <LinkContainer>
          아직 회원이 아니신가요?&nbsp;
          <a href="/signup">회원가입 하러가기</a>
        </LinkContainer>
      </Form>
    </>
  );
};

export default Loading;
