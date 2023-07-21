import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import MobileWrap from "../common/MobileWrap";
import {useRef,useEffect,useState,ChangeEvent} from 'react';

function Chat() {
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    const handleChatInfoChange = (newInfo:string) => {
        setChatMessages(prevMessages => [...prevMessages, newInfo]);
    };

    return(
        <MobileWrap >

                <ChatHeader/>
                <Info/> 
                <Chatting chatMessages={chatMessages} />

                <SendChat updateChatInfo={handleChatInfoChange}/>


            
        </MobileWrap>
    )
}


function Chatting({chatMessages}: { chatMessages: string[]}){

    return (
        <ChattingArea>
        {chatMessages.map((message, index) => (
            <div key={index}>
                <Message>
                    {message}
                </Message>
                <br/>
            </div>
        ))}
        </ChattingArea>
    )
}

const Message =styled.div`
    font-size: 14rem;
    display:inline-block;
    // width:auto;
    max-width: 200rem;
    height:auto;
    background-color: #38DB83;
    padding: 10rem;
    border-radius:15rem;
    white-space: pre-wrap;
    word-wrap: break-word;

    margin: 10rem 10rem 0 180rem;
    line-height:1.3;
    float:right;
  
`
const ChattingArea =styled.div`
    width:100%;
    background-color:pink;
    margin-top:141rem;  
    // height: 625rem;
    overflow: auto;
`
//------------------
interface SendChatProps {
    updateChatInfo: (newInfo: string) => void; 
  }
function SendChat({ updateChatInfo }:SendChatProps){

    const inputTextRef = useRef<HTMLTextAreaElement>(null!);

    const [inputValue, setInputValue] = useState('');
    const updateHeight=()=>{
        if (inputTextRef.current) {
            inputTextRef.current.style.height = '40rem';
            inputTextRef.current.style.height = inputTextRef.current.scrollHeight.toString() + 'px';
          }
        }
    useEffect(()=>{
        console.log("inputTextRef.current:", inputTextRef.current);
    
        updateHeight();
    },[])


    const handleChange = (event :ChangeEvent<HTMLTextAreaElement>) => {
        updateHeight();
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
          setInputValue('');
          inputTextRef.current.style.height = '40rem';
          updateChatInfo(inputValue);
        }
      };
    
    return(
        <SendChatArea >
            <FontAwesomeIcon icon={faCamera} style={{color: "#000000",height:"30rem",padding:"0 11rem 0 17rem",cursor:"pointer"}} />
            <InputText  ref={inputTextRef} value={inputValue} onChange={handleChange} ></InputText>
            <SendButton type="submit"  onClick={handleSubmit} ><FontAwesomeIcon icon={faArrowUp} style={{color: "#fff",height:"30rem",padding:"2rem"}} /></SendButton>
        </SendChatArea>
        
    )
}

const SendChatArea=styled.div`
    width:inherit;
    min-height:65rem;
    position:absolute;
    bottom:0;
    display:flex;
    align-items:center;
    padding-top:10rem;
    padding-bottom:10rem;
    border-top:1px solid #dddddd;
`

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
`
const SendButton = styled.button`
    width:37rem;
    height:37rem;
    border-radius:100%;
    background-color:#38DB83;
    margin-left:8rem;
    cursor:pointer;
`

//----------------------------------
function Info(){
    return (
        <InfoArea>
            <InfoPic></InfoPic>
            <InfoText>
                <div style={{display:"flex", paddingBottom:"7rem"}}>
                    <InfoState>거래중</InfoState>
                    <InfoTitle>양배추 반 개 팝니다</InfoTitle>
                </div>
                <InfoPrice>5,000원</InfoPrice>
            </InfoText>
        </InfoArea>
    )

}

const InfoArea= styled.div`
    width:inherit;
    position:fixed;
    margin-top:56rem;
    padding: 15rem;
    display:flex;
    border-bottom:1px solid #dddddd;
`
const InfoPic= styled.div`
    width:55rem;
    height:55rem;
    background-color:#DDDDDD;
    border-radius:5rem;
`
const InfoText=styled.div`
    display:flex;
    flex-direction: column;
    padding:10rem 0 10rem 15rem;
`
const InfoState= styled.div`
    font-size: 14px;
    font-weight:bold;
    padding-right:10rem;
`
const InfoTitle= styled.div`
    font-size: 14px;
`
const InfoPrice= styled.div`
    font-size: 13px;
    font-weight:bold;
`

//----------------------------------
function ChatHeader(){
    return (
        <ChtHeader>
            <Header>
                <UserName>user1</UserName>
            </Header>
            <GoBack>
            <FontAwesomeIcon icon={faChevronLeft} style={{ height: "23rem", color: "black" }}/> 
            </GoBack>
        </ChtHeader>
    )
}

const ChtHeader=styled.div`
    position:fixed;
    border-bottom: 1px solid #DDDDDD;
    background-color:white;
`
const Header=styled.div`
    position:fixed;
    width:390rem;
    border-radius: 20px 20px 0 0;
    height: 56rem;
    display: flex;
    justify-content: center; 
    align-items: center; 
    border-bottom: 1px solid #DDDDDD;
`
const GoBack= styled.button`
    width:56rem;
    height:55rem;
    background-color:white;
    border-radius:20px 0 0  0;
    cursor:pointer;
    position:relative;
`
const UserName=styled.div`
    font-size:20rem;
    font-weight:600;
    text-align:center;
`
//----------------------------------
export default Chat