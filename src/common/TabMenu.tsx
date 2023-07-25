import { styled } from "styled-components";
export default function TabMenu() {
  return <MenuWrap></MenuWrap>;
}

const MenuWrap = styled.div`
  position: fixed;
  left: auto;
  bottom: auto;
  width: 390px;
  border-radius: 10px 10px 0px 0px;
  border-top: 1px solid #dadada;
  background: #fff;
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
