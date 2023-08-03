import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import theme from "../common/theme";
import { Link } from "react-router-dom";
export default function TrandingLocation() {
  return (
    <LocationWrap>
      <h4>
        <FontAwesomeIcon icon={faLocationDot} /> 거래 위치
      </h4>
      <div>
        <p>번1동 동사무소</p>
      </div>
      <Link to="/tradePlace">
        <button type="button">위치 수정</button>
      </Link>
    </LocationWrap>
  );
}

const LocationWrap = styled.div`
  margin-top: 20px;

  div {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    border: 1px solid #b0b0b0;
    border-radius: 5px;
    margin-top: 8px;
    p {
      font-size: 14rem;
    }
  }
  button {
    background-color: ${theme.colors.main};
    color: #fff;
    border-radius: 5px;
    padding: 6px 14px;
    font-size: 14rem;
    font-weight: 800;
    margin-top: 10px;
    cursor: pointer;
  }
`;
