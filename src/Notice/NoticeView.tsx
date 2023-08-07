import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useEffect, useState} from "react";
import axios from "axios";
import { NOTICES_URL } from "../url";
interface Post{
    content:string;
    createdAt:string;
    id:number;
    modifiedAt:string;
    nickname:string;
    noticeImg:string;
    title:string;
    userId:number;
    viewCount:number;
}
function NoticeView(){
    const { noticeId } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    console.log(noticeId)
    useEffect(() => {
        axios.get<Post>(`${NOTICES_URL}/${noticeId}`)
          .then((response) => {
               const post = response.data;
               console.log(post)
               setPost(post);
          })
          .catch((error) => {
            console.error(error);
    });},[])
    return (
        <NoticeViewArea>
            <Notice>공지사항</Notice>
            <NoticeTitleDate>
                <NoticeTitle>{post?.title}</NoticeTitle>
                <NoticeDate>{post?.createdAt.slice(0, 10)}</NoticeDate>
            </NoticeTitleDate>
            <NoticeContent>
                {post?.content}
            </NoticeContent>
            {/* <img src={post?.noticeImg}/> */}
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