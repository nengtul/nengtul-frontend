import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import ChatHeader from "./ChatHeader";
import Chatting2 from "./Chatting2";

import Info from "./Info";
import { useState,useEffect,useRef,KeyboardEvent ,ChangeEvent} from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import * as StompJs from '@stomp/stompjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
interface Chat{
  roomId:string;
  latestChat:string;
  receiverNickname:string;
  shareBoardTitle:string;
  receiverPhoto:string;
  shareBoardMainPhoto:string;
  shareBoardPrice:number;
}
//채팅 목록에서 채팅으로 들어가는 경우
function ChatPage2() {
  const userID=Number(sessionStorage.getItem('userId'));
  const location = useLocation();

  const [receivedChatMessages, setReceivedChatMessages] = useState<
    { message: string; isMyMessage: boolean }[]
  >([]);
  console.log(location.state.chat)
  const chat:Chat=location.state.chat
  const ROOMID=chat.roomId;
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue} = Token;
  const MY_TOKEN = accessTokenValue;
  
  const client = useRef<any>({});
  const disconnect = () => {
    client.current.deactivate();
    console.log('채팅이 종료되었습니다.');
   
  };
  useEffect(()=>{
    const connect = () => {
      client.current= new StompJs.Client({
        brokerURL: 'wss://nengtul.shop/chat',
        connectHeaders: {
              Authorization: `Bearer ${MY_TOKEN}` 
            },
        onConnect: () => {
          console.log('success');
          subBeforeChat(userID,ROOMID)
          subChat(userID);
        },
      });
      client.current.activate();
    };
    connect();
    return () => disconnect();
  },[ userID,ROOMID])

  const subBeforeChat=(userID:number,ROOMID:string)=>{
    console.log('여기는 가나?')
    console.log(userID,ROOMID)
    client.current.subscribe(
      `/sub/chat/get/users/${userID}`,
      (message:any)=>{
        console.log('보여라3',JSON.parse(message.body))
        const messages = JSON.parse(message.body); 
        messages.forEach((jsonMessage: any) => {
          const isMyMessage = jsonMessage.senderNickname === sessionStorage.getItem('nickName') ? true : false;
          setReceivedChatMessages((prevMessages) => [
            ...prevMessages,
            {
              message: jsonMessage.content,
              isMyMessage: isMyMessage,
            },
          ]);
        });
    }
    )
    client.current.publish({
      destination:`/pub/chat/get/rooms/${ROOMID}`,
    }
    )
  }
  const subChat=(userID:number)=>{
    console.log('id',userID)
    client.current.subscribe(
            `/sub/chat/send/rooms/${ROOMID}`,
            (message:any)=>{
                console.log('보여라2',JSON.parse(message.body))
                const jsonMessage = JSON.parse(message.body);
                const isMyMessage = jsonMessage.senderNickname === sessionStorage.getItem('nickName')? true:false;

                setReceivedChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: jsonMessage.content,
                        isMyMessage: isMyMessage,
                    },
                ]);
            }
          )
    
  }


  //채팅보내기 부분
  const inputTextRef = useRef<HTMLTextAreaElement>(null!);
  const [inputValue, setInputValue] = useState('');
  const updateHeight=()=>{
      if (inputTextRef.current) {
          inputTextRef.current.style.height = '40rem';
          inputTextRef.current.style.height = inputTextRef.current.scrollHeight.toString() + 'px';
        }
      }
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Enter") {
          e.preventDefault(); 
          handleSubmit();
      }
  }
  useEffect(() => {
      updateHeight();
  }, [inputValue]);
      

  const handleChange = (event :ChangeEvent<HTMLTextAreaElement>) => {
      updateHeight();
      setInputValue(event.target.value);
  };

  const handleSubmit = () => {
      if (inputValue.trim() !== '') {
            client.current.publish({
              destination:`/pub/chat/send/rooms/${ROOMID}`,
              body: inputValue,
            })
        setInputValue('');
        inputTextRef.current.style.height = '40rem';
      }
    };
  return (
    <MobileWrap>
      <ChatWrap>
        <ChatHeader user={chat.receiverNickname}/>
        <Info title={chat.shareBoardTitle} photo={chat.shareBoardMainPhoto}  price={chat.shareBoardPrice}/>
        <Chatting2 chatMessages={[...receivedChatMessages]} />
        <SendChatArea >
          <FontAwesomeIcon icon={faCamera} style={{color: "#000000",height:"30rem",padding:"0 11rem 0 17rem",cursor:"pointer"}} />
            <InputText  ref={inputTextRef} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}></InputText>
            <SendButton type="submit"  onClick={handleSubmit} ><FontAwesomeIcon icon={faArrowUp} style={{color: "#fff",height:"30rem",padding:"2rem"}} /></SendButton>
        </SendChatArea>
      </ChatWrap>
    </MobileWrap>
  );
}
const InputText=styled.textarea`
    width:70%;
    max-height: 250rem;
    background-color:#dddddd;
    resize: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    padding:5px;
    font-size:20rem;
    border:none;
    border-radius:7rem;
    outline: none;
    overflow:hidden;
`
const ChatWrap = styled.div`
  display: flex;
  height: 844px;
  width: inherit;
  flex-direction: column;
`;
const SendButton = styled.button`
    width:37rem;
    height:37rem;
    border-radius:100%;
    background-color:#38DB83;
    margin-left:8rem;
    cursor:pointer;
`
const SendChatArea=styled.div`
    width:inherit;
    bottom:0;
    display:flex;
    align-items:center;
    padding-top:10rem;
    padding-bottom:10rem;
    border-top:1px solid #dddddd;
`
export default ChatPage2;
