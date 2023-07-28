import styled from "styled-components";
import theme from "./theme";

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

    &::-webkit-scrollbar {
      height: 6px;
      cursor: grab;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.main};
      border-radius: 10px;
      width: 2px;
    }

    li {
      width: 100px;
      height: 100px;
      background-color: #333;
      flex-shrink: 0;
      font-size: 20rem;
      color: #fff;
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
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
      </LatestWrap>
    </>
  );
}
