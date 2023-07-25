import { styled } from "styled-components";
export default function TabMenu() {
  return <MenuWrap></MenuWrap>;
}

const MenuWrap = styled.div`
  position: absolute;
  left: auto;
  bottom: 0;
  width: 390px;
  height: 56px;
  border-top: 1px solid #dadada;
  background: #333;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
  z-index: 88888;
  padding: 20px 0px;
  ul {
    width: 92%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
