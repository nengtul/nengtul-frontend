import { styled } from "styled-components";

const ContensWrap = styled.div`
  width: 100%;
  padding: 56px 0px;
  height: 844px;
  max-height: 844px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b5b5b5;
    border-radius: 10px;
    width: 2px;
  }
`;

export default ContensWrap;
