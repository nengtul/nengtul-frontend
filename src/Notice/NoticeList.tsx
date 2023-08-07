import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Post } from "./ListWrap";
interface NoticeContentProps{
  content:Post;
}
export default function NoticeList( {content} :NoticeContentProps) {
  return (
    <>
      <NoticeLi>
        <Link to={`/noticeView/${content.noticeId}`}>
          <h4>{content.title}</h4>
          <span>{content.createdAt.slice(0, 10)}</span>
        </Link>
      </NoticeLi>
    </>
  );
}

const NoticeLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #ddd;
  a {
    display: flex;
    width: 100%;
    padding: 20px 10px;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: 15rem;
      width: 75%;
      font-weight: 700;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span {
      width: 23%;
      font-size: 13rem;
      color: #ddd;
    }
  }
`;
