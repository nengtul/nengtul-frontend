import styled from "styled-components";

const MobileWrap = styled.div`
  width: 390px;
  margin: 0 auto;
  max-height: 844px;
  height: 844px;
  border-radius: 20px;
  position: relative;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
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

export default MobileWrap;
