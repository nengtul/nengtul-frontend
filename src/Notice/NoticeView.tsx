import styled from "styled-components";
function NoticeView(){
    return (
        <NoticeViewArea>
            <Notice>공지사항</Notice>
            <NoticeTitleDate>
                <NoticeTitle>개인정보처리방침 변경 사전 안내</NoticeTitle>
                <NoticeDate>2022.10.11</NoticeDate>
            </NoticeTitleDate>
            <NoticeContent>
                안녕하세요. 카카오뱅크입니다. 
                <br/>
                카카오뱅크를 이용해 주시는 고객님들께 안내 말씀드립니다. 
                <br/>
                <br/>
                <br/>
                통신사 시스템 개선 작업으로 인하여 아래와 같이 업무가 일시 중단되오니 고객님의 넓은 이해 부탁드리며, 이용 시 아래 내용에 유의해 주시기 바랍니다.
                <br/>
                <br/>
                <br/>
                ■ 중단 일시 
                <br/>
                - 2023년 7월 26일 (수) 00:00 ~ 05:35
                <br/>
                <br/>
                <br/>
                ■ 중단 사유 
                <br/>
                - LGU+ 시스템 개선 작업 
                <br/>
                <br/>
                <br/>
                ■ 중단 업무 
                <br/>
                - LGU+(알뜰폰 포함) 휴대전화 본인확인 서비스 이용시 일시적인 끊김 발생
                <br/>
                <br/>
                <br/>
                ※ 중단시간은 작업 진행에 따라 변경될 수 있습니다. 
                <br/>
                <br/>
                <br/>
                보다 안정적인 서비스를 제공하기 위해 노력하겠습니다. 
                <br/>
                카카오뱅크 드림
            </NoticeContent>
        </NoticeViewArea>
    )
}

export default NoticeView

const NoticeViewArea = styled.div`
    margin-top:10rem;
`

const Notice=styled.h1`
    font-size:30rem;
    padding:15rem 20rem ;
    
`
const NoticeTitleDate=styled.div`
    padding:15rem 20rem ;
    background-color:rgb(221, 221, 221)
`
const NoticeTitle=styled.div`
    font-size:20rem;
`
const NoticeDate=styled.div`
    padding-top:5rem;
    font-size:15rem;
`

const NoticeContent=styled.div`
    font-size:20rem;
    padding:10rem 20rem;
    line-height:1.5;
`