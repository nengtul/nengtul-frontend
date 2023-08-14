import styled from "styled-components";
import {useRef,useEffect} from 'react';
interface ChatMess{
    chatMessages: { message: string; isMyMessage: boolean }[];
}
function Chatting2({chatMessages}:ChatMess){
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight; //현재 스크롤의 위치를 스크롤의 길이만큼 설정해 놓으면 항상 채팅 젤 밑을 볼 수 있다.
          }
        }, [chatMessages]);
    console.log('이거는보이나?',chatMessages)
    return (
        <ChattingArea ref={scrollRef}>
        {chatMessages.map((message, index) => (
            <div key={index} >
                 {message.isMyMessage ? (
                    <div>
                    <MyMessage>{message.message}</MyMessage>
                    </div>
                    ) : (
                    <GetMessage>{message.message}</GetMessage>
                )}
                {/* <Message isMyMessage={message.isMyMessage}>
                    {message.message}
                </Message> */}
                <br/>
            </div>
        ))}
        </ChattingArea>
    )
}

const MyMessage =styled.div`
    font-size: 14rem;
    display:inline-block;
    max-width: 200rem;
    height:auto;
    background-color: #38DB83;
    padding: 10rem;
    border-radius:15rem;
    white-space: pre-wrap;
    word-wrap: break-word;

    margin: 10rem 10rem 0rem 180rem;
    line-height:1.3;
    float:right;
`
const GetMessage =styled.div`
    font-size: 14rem;
    // display:inline-block;
    max-width: 200rem;
    height:auto;
    background-color: red;
    padding: 10rem;
    border-radius:15rem;
    white-space: pre-wrap;
    word-wrap: break-word;

    margin: 10rem 10rem 0rem 20rem;
    line-height:1.3;
  
`
const ChattingArea =styled.div`
    // background-color:pink;
    margin-top:141rem;  
    overflow-y: scroll;
    flex-grow: 1; 

    &::-webkit-scrollbar {
    width: 2px;
    }
    &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
    background-color: #b5b5b5;
    border-radius: 10px;
    width: 2px;
    }
    
`

export default Chatting2