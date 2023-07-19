import styled from "styled-components";
import HomeButton from "../assets/icon/home.svg";
import Search from "../assets/icon/search.svg";
import HeaderTabMenu from "./HeaderTabMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  padding: 12px 10px;
  padding-right: 2px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
  position: fixed;
  left: auto;
  top: auto;
  width: 390px;
  z-index: 999999;
  border-radius: 20px 20px 0px 0px;
  img {
    cursor: pointer;
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 30px;
  cursor: pointer;

  span {
    width: 5px;
    height: 5px;
    background-color: #000;
    margin-bottom: 6px;
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default function Header() {
  const [showTabMenu, setShowTabMenu] = useState(false);

  const toggleTabMenu = () => {
    setShowTabMenu(!showTabMenu);
  };

  const navigate = useNavigate();

  return (
    <>
      <StyledHeader>
        <div>
          <img
            src={HomeButton}
            alt="home-button"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <RightMenu>
          <Link to={"/search"}>
            <img src={Search} alt="search-button" />
          </Link>
          <HamburgerIcon onClick={toggleTabMenu}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </RightMenu>
        {showTabMenu && <HeaderTabMenu />}
      </StyledHeader>
    </>
  );
}
