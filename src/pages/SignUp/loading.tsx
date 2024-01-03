import { FC } from "react";
import { Form, Header, LinkContainer } from "./styles";
import { LoadingBar } from "@components/LoadingBar";
import { Button } from "@components/Button";
import { Link } from "react-router-dom";
import { LabelText } from "@components/LabelText";

const Loading: FC = () => {
  return (
    <div id="container">
      <Header>slack</Header>
      <Form>
        <LabelText id="email-label">
          <span>이메일 주소</span>
          <LoadingBar style={{ height: "44px", marginBottom: "20px" }} />
        </LabelText>
        <LabelText id="nickname-label">
          <span>닉네임</span>
          <LoadingBar style={{ height: "44px", marginBottom: "20px" }} />
        </LabelText>
        <LabelText id="password-label">
          <span>비밀번호</span>
          <LoadingBar style={{ height: "44px", marginBottom: "20px" }} />
        </LabelText>
        <LabelText id="password-check-label">
          <span>비밀번호 확인</span>
          <LoadingBar style={{ height: "44px", marginBottom: "20px" }} />
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

export default Loading;
