import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import MobileWrap from "../common/MobileWrap";
import {useRef,useEffect,useState,ChangeEvent} from 'react';
import ChatHeader from "./ChatHeader";
import Chatting from "./Chatting";
import SendChat from "./SendChat";
import Info from "./Info";
function Chat() {
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    const handleChatInfoChange = (newInfo:string) => {
        setChatMessages(prevMessages => [...prevMessages, newInfo]);
    };


    return(
        <MobileWrap >
            <ChatWrap>
                <ChatHeader/>
                <Info/> 
                <Chatting chatMessages={chatMessages}  />
                <SendChat updateChatInfo={handleChatInfoChange}/>
            </ChatWrap>
        </MobileWrap>
    )
}


const ChatWrap= styled.div`
    display:flex;
    height:100%;
    width:inherit;
    flex-direction: column;
`

//----------------------------------


//----------------------------------

//----------------------------------
export default Chat