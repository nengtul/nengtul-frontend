import { styled } from "styled-components";

const LatestWrap = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f6f6f6;

  p {
    font-size: 15rem;
    font-weight: 800;
  }

  ul {
    display: flex;
    margin-top: 10px;
    overflow-x: scroll;

    li {
      width: 100px;
      height: 100px;
      background-color: #333;
      flex-shrink: 0;
    }

    li:not(:nth-of-type(1)) {
      margin-left: 10px;
    }
  }
`;

export default function HeaderLatest() {
  return (
    <>
      <LatestWrap>
        <p>최근 본 레시피</p>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </LatestWrap>
    </>
  );
}
