import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import ChatHeader from "./ChatHeader";
import Chatting from "./Chatting";
import SendChat from "./SendChat";
import Info from "./Info";
import { useState,useEffect,useRef,KeyboardEvent ,ChangeEvent} from "react";
import { useLocation } from 'react-router-dom';
import { Post } from "../IngredientMap/MarkerMap";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import * as StompJs from '@stomp/stompjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
function ChatPage() {
  const userID=Number(sessionStorage.getItem('userId'));
  const [roomId, setRoomId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const handleChatInfoChange = (newInfo: string) => {
    setChatMessages((prevMessages) => [...prevMessages, newInfo]);
  };
  const location = useLocation();
  const selectedMarker: Post= location.state.selectedMarker;
  // console.log(selectedMarker)

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
          console.log('여기로 가나?',selectedMarker.id)
          subChat(userID);

          // publishOnWait();
        },
      });
      client.current.activate();
    };
    connect();
    return () => disconnect();
  },[selectedMarker.id, userID])

  const subChat=(userID:number)=>{
    console.log('id',userID)
    client.current.subscribe(
      `/sub/chat/start/users/${userID}`
      ,(message:any)=>{
        console.log('보여라1',JSON.parse(message.body))
        const JsonMessage=JSON.parse(message.body)
        const roomID=JsonMessage.roomId;
        console.log('roomId',roomID);
        setRoomId(roomID);
        console.log('roomId2',roomID);
        client.current.subscribe(
          `/sub/chat/send/rooms/${roomID}`,
          (message:any)=>{
            console.log('보여라2',roomId)
            console.log('보여라2',message)
            console.log('보여라2',JSON.parse(message.body))
          }
          )
      },
      )

  }


  //채팅보내기 부분
  const [first,setFirst]=useState(false)
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
          e.preventDefault(); // 엔터 키의 기본 동작인 줄바꿈 방지
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
          if(!first){
              client.current.publish({
                  destination:`/pub/chat/start/shareboards/${selectedMarker.id}`,
                  body:inputValue,
                
              }
              )
                setFirst(true)
          }else{
            console.log('여기는?',roomId)
            console.log(inputValue)
            client.current.publish({
              destination:`/pub/chat/send/rooms/${roomId}`,
              body: inputValue,
            })
          
          }
        setInputValue('');
        inputTextRef.current.style.height = '40rem';
        handleChatInfoChange(inputValue);
      }
    };
  return (
    <MobileWrap>
      <ChatWrap>
        <ChatHeader />
        <Info selectedMarker={selectedMarker} />
        <Chatting chatMessages={chatMessages} />
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
export default ChatPage;
