import { styled } from "styled-components";
import theme from "../common/theme";
import NoticeList from "./NoticeList";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { NOTICES_LIST_URL } from "../url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import  {getData} from "../axios";
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
    // axios.get<ContentData>(NOTICES_LIST_URL)
    //   .then((response) => {
    //         const contentArr=response.data.content
    //         setContents(contentArr)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    getData<ContentData>(NOTICES_LIST_URL,)
      .then((data:ContentData)=>{
        const contentArr=data.content;
        setContents(contentArr)
      })
      .catch(error=>{
          console.log(error)
      })
  
  },[])
  const navigate = useNavigate();
  const goToWrite=()=>{
    navigate('/noticeWrite')
  }
  return (
    <Wrap>
      <h2>공지사항</h2>
      <ul>
        {contents?.map((content)=><NoticeList key={content.noticeId} content={content}/>)}      
      </ul>
      <button type="button"  className="write-btn" onClick={goToWrite}>
        <FontAwesomeIcon icon={faPen} />
      </button>
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
  .write-btn{
    width:50rem;
    height:50rem;
    color:white;
    background-color:${theme.colors.main};
    display: inline-block;
    cursor: pointer;
    position: absolute;
    left: 83%;
    font-size:25rem;
    bottom: 70px;
    z-index: 9999;
    border-radius:100%;
  }
`;
