import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import MobileWrap from "../common/MobileWrap";

function Chat() {
 return(
    <MobileWrap>
        <ChatHeader/>
        <Info/>
        <SendChat/>
    </MobileWrap>
 )
}


function SendChat(){
    return(
        
        <SendChatArea>
            <FontAwesomeIcon icon={faCamera} style={{color: "#000000",width:"40rem",height:"30rem",padding:"0 10rem 0 10rem"}} />
            <InputText></InputText>
            <SendButton><FontAwesomeIcon icon={faArrowUp} style={{color: "#fff",width:"40rem",height:"30rem",padding:"3rem"}} /></SendButton>
        </SendChatArea>
        
    )
}

const SendChatArea=styled.div`
    width:inherit;
    height:65rem;
    background-color:pink;
    position:absolute;
    bottom:0;
    display:flex;
    align-items:center;

    
`

const InputText=styled.textarea`
    width:65%;
    max-height:40%;
    background-color:#dddddd;
    resize: none; /* 사용자가 크기를 조정하지 못하도록 함 */
    word-wrap: break-word;
    white-space: pre-wrap;
    padding:5px;
    font-size:20rem;
    
`
const SendButton = styled.button`
width:37rem;
height:37rem;
border-radius:100%;
background-color:#38DB83;
margin-left:15rem;

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