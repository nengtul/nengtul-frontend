import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import ChatHeader from "./ChatHeader";
import Chatting from "./Chatting";
import SendChat from "./SendChat";
import Info from "./Info";
import { useState } from "react";
function ChatPage() {
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const handleChatInfoChange = (newInfo: string) => {
    setChatMessages((prevMessages) => [...prevMessages, newInfo]);
  };

  return (
    <MobileWrap>
      <ChatWrap>
        <ChatHeader />
        <Info />
        <Chatting chatMessages={chatMessages} />
        <SendChat updateChatInfo={handleChatInfoChange} />
      </ChatWrap>
    </MobileWrap>
  );
}

const ChatWrap = styled.div`
  display: flex;
  height: 844px;
  width: inherit;
  flex-direction: column;
`;

export default ChatPage;
