import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function NoticeList() {
  return (
    <>
      <NoticeLi>
        <Link to={"/"}>
          <h4>냉장고를 털어줘가 정식 오픈했습니다..</h4>
          <span>2023-07-31</span>
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
