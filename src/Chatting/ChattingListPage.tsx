import styled from "styled-components";

import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
function ChattingList() {

    const chattings=Array.from({ length: 8 }, (_,index) => (
                    <Chat key={index}>
                        <UserPic></UserPic>
                        <UserText>
                            <UserInfo>
                                <UserId>user1</UserId>
                                <UserPlace>번동</UserPlace>
                                <ChatTime>1달 전</ChatTime>
                            </UserInfo>
                        
                            <ChatContent>안녕하세요 가능합니다닷</ChatContent>
                        </UserText>
                        <NewChat>2</NewChat>
                        <IngredientPic></IngredientPic>
                    </Chat>
    ))
    return (
        <MobileWrap>
            <Header/>
            <ContentWrapper>
                <Title>채팅</Title>
                <ChatList>
                    {chattings}
                </ChatList>
            </ContentWrapper>
        </MobileWrap>
    )

}

export default ChattingList;

const ContentWrapper = styled.div`
  padding-top: 57px; 
  display: flex;
  flex-direction: column;
  height:100%;
`;

const Title=styled.div`
    width:390rem;
    height:60rem;
    background-color:#fff;
    color:#38DB83;
    font-size: 24rem;
    font-weight:700;
    padding-left:2%;
    padding-top:20rem;
    z-index:2;
    position:fixed;
`

const ChatList=styled.div`
    padding-top: 65px; 
    width:100%;
    flex-grow:1;
`
const Chat=styled.div`  
    position:relative;
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 111rem;
    border-bottom: 1px solid #DDDDDD;
    cursor:pointer;
`
const UserPic=styled.div`
    margin: 0 10rem 0 10rem;
    width:60rem;
    height:60rem;
    border-radius:100%;
    background-color:#DDDDDD;
`

const UserText=styled.div`
    display:flex;
    flex-direction: column;
    margin: 0 10rem 0 10rem;
    width: 200rem;
    `
    
const UserInfo=styled.div`
    display:flex;
    align-items: center;
    padding-bottom: 7rem;
    `
const UserId=styled.div`
    font-size:22rem;
    font-weight:600;
    margin-right:9rem;
`
const UserPlace=styled.div`
    font-size:16rem;
    color:#B0B0B0;
    margin-right:7rem;
`
const ChatTime=styled.div`
    font-size:16rem;
    color:#B0B0B0;`
const ChatContent=styled.div`
    font-size:20rem;
    height:20rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const NewChat=styled.div`
    position:absolute;
    width: 22rem;
    height:22rem;
    border-radius:100%;
    background-color:#38DB83;
    color:white;
    font-size:12rem;
    font-weight:1000;
    text-align:center;
    right:80rem;
    padding:4px;
    
    
`
const IngredientPic=styled.div`
    margin: 0 10rem 0 10rem;
    width:55rem;
    height:55rem;
    border-radius:5rem;
    background-color:#DDDDDD;
    `