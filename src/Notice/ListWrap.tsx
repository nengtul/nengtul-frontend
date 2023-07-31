import { styled } from "styled-components";
import theme from "../common/theme";
import NoticeList from "./NoticeList";

export default function NoticeWrap() {
  return (
    <Wrap>
      <h2>공지사항</h2>
      <ul>
        <NoticeList />
        <NoticeList />
        <NoticeList />
        <NoticeList />
        <NoticeList />
        <NoticeList />
        <NoticeList />
        <NoticeList />
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
