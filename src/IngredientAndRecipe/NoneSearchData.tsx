import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import theme from "../common/theme";
import EggPart from "../LoginAndNewUser/EggPart";

export default function NoneSearchData() {
  return (
    <NoneData className="none">
      <EggPart />
      <h2>검색 결과가 없습니다.</h2>
      <Link to={"/search"}>
        다시 검색하기 <FontAwesomeIcon icon={faRotateRight} />
      </Link>
    </NoneData>
  );
}

const NoneData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 20rem;
    font-weight: 800;
    color: #737373;
  }
  a {
    font-size: 18rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    background-color: ${theme.colors.main};
    padding: 10px 26px;
    border-radius: 10px;
    color: #fff;
    margin-top: 20px;
    svg {
      margin-left: 10px;
    }
  }
`;
