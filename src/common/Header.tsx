import styled from "styled-components";
import HomeButton from "../assets/icon/home.svg";
import Search from "../assets/icon/search.svg";
import Menu from "../assets/icon/hamburger.svg";

const StyledHeader = styled.header`
  padding: 3px 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  return (
    <>
      <StyledHeader>
        <div>
          <img src={HomeButton} alt="home-button" />
        </div>
        <RightMenu>
          <img src={Search} alt="search-button" />
          <img src={Menu} alt="menu-button" />
        </RightMenu>
      </StyledHeader>
    </>
  );
}
