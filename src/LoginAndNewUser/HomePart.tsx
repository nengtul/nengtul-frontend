import styled from "styled-components";
import HomeIcon from "../assets/icon/HomeIcon.svg";
import { Link } from "react-router-dom";
function HomePart() {
  return (
    <Home>
      <HomeImg>
        <Link to={"/"}>
          <img src={HomeIcon} alt="HomeIcon" />
        </Link>
      </HomeImg>
    </Home>
  );
}
export default HomePart;

const Home = styled.div``;
const HomeImg = styled.div`
  padding-top: 19px;
  padding-left: 20px;
  cursor: pointer;
`;
