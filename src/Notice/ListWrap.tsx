import { styled } from "styled-components";
import theme from "../common/theme";
import NoticeList from "./NoticeList";
import { useEffect, useState} from "react";
import axios from "axios";

interface ContentData{
  content:Post[]
}
export interface Post{
  content:string;
  createdAt:string;
  modifiedAt:string;
  nickname:string;
  noticeId:number;
  noticeImg:string;
  title:string;
  viewCount:number;

}
export default function NoticeWrap() {
  const [contents,setContents]=useState<Post[]>([])
  useEffect(() => {
    axios.get<ContentData>("https://nengtul.shop/v1/notices/list")
      .then((response) => {
            const contentArr=response.data.content
            setContents(contentArr)
      })
      .catch((error) => {
        console.error(error);
});},[])
  return (
    <Wrap>
      <h2>공지사항</h2>
      <ul>
        {contents?.map((content)=><NoticeList key={content.noticeId} content={content}/>)}
        {/* <NoticeList /> */}
      
      </ul>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 94%;
  margin: 20px auto;

  h2 {
    font-size: 24rem;
    text-align: center;
    font-weight: 800;
    color: ${theme.colors.main};
  }
  ul {
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
    border-radius: 8px;
  }
`;
