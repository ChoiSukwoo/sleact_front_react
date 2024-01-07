import { FC } from "react";
import { Container } from "./styles";
import Header from "./components/Header/loading";
import ChatList from "@components/ChatList/loading";
import ChatBox from "@components/ChatBox/loading";

const loading: FC = () => {
  return (
    <Container>
      <Header />
      <ChatList />
      <ChatBox />
    </Container>
  );
};

export default loading;
