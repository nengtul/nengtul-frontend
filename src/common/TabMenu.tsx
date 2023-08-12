import { Link } from "react-router-dom";
import { styled } from "styled-components";
// import ChatIcon from "../assets/Tabmenu/ChatIcon.png";
// import HomeIcon from "../assets/Tabmenu/HomeIcon.png";
// import MyIcon from "../assets/Tabmenu/MyIcon.png";
// import RecipeIcon from "../assets/Tabmenu/RecipeIcon.png";
// import SearchIcon from "../assets/Tabmenu/SearchIcon.png";

import theme from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faCommentDots } from "@fortawesome/free-regular-svg-icons";
export default function TabMenu() {
  return (
    <MenuWrap>
      <ul>
        <li>
          <Link to={"/search"}>
            {/* <img src={SearchIcon} alt="search-btn" /> */}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </li>
        <li>
          <Link to={"/recipelist"}>
            {/* <img src={ChatIcon} alt="search-btn" /> */}
            <FontAwesomeIcon icon={faReceipt} />
          </Link>
        </li>
        <li className="center">
          <Link to={"/"}>
            {/* <img src={HomeIcon} alt="search-btn" /> */}
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li>
          <Link to={"/chattinglist"}>
            {/* <img src={RecipeIcon} alt="search-btn" /> */}
            <FontAwesomeIcon icon={faCommentDots} />
          </Link>
        </li>
        <li>
          <Link to={"/myPage"}>
            {/* <img src={MyIcon} alt="search-btn" /> */}
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
        </li>
      </ul>
    </MenuWrap>
  );
}

const MenuWrap = styled.div`
  position: absolute;
  left: auto;
  bottom: 0;
  width: 390px;
  box-shadow: 0px 1px 4px 0px rgb(119 119 119);
  z-index: 88888;
  background-color: #fff;
  ul {
    width: 92%;
    height: 56px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background-color: #fff;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          font-size: 26rem;
          color: ${theme.colors.main};
        }
      }
      img {
        width: 35px;
      }
    }
    li.center {
      width: 62px;
      height: 62px;
      background-color: ${theme.colors.main};
      svg {
        color: #fff;
      }
    }
  }
`;
